import React, { useEffect, useState } from 'react';
import TaskForm, { TaskFormInput } from '../components/molecules/TaskForm';
import MatrixBoard from '../components/organisms/MatrixBoard';
import Overview from '../components/organisms/Overview';
import { Task, TaskState } from '../components/molecules/TaskCard';
import Icon from '../components/atoms/Icon';
import ConfirmationDialog from '../components/molecules/ConfirmationDialog';
import { loadTasks, saveTasks, generateId } from '../lib/persistence';
import { getCurrentDateISO } from '../lib/dateUtils';

const EisenhowerMatrixApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (task: TaskFormInput) => {
    setTasks(prev => [
      ...prev,
      {
        id: generateId(),
        title: task.title,
        description: task.description,
        important: task.important,
        urgent: task.urgent,
        deadline: task.deadline,
        timeEstimate: task.timeEstimate,
        completedAt: task.completedAt,
        state: 'created',
      },
    ]);
  };

  const handleUpdateTask = (task: TaskFormInput) => {
    setTasks(prev => prev.map(t => {
      if (t.id === editTaskId) {
        const updatedTask = { ...t, ...task };
        // Preserve completion date if task is already done
        if (t.state === 'done' && t.completedAt && !task.completedAt) {
          updatedTask.completedAt = t.completedAt;
        }
        return updatedTask;
      }
      return t;
    }));
  };

  const handleTaskStateChange = (taskId: string, state: TaskState) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const updatedTask = { ...t, state };
        // Set completion date when task is marked as done
        if (state === 'done' && !t.completedAt) {
          updatedTask.completedAt = getCurrentDateISO();
        }
        return updatedTask;
      }
      return t;
    }));
  };

  const handleEditTask = (taskId: string) => {
    setEditTaskId(taskId);
    setShowModal(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskToDelete(taskId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      setTasks(prev => prev.filter(t => t.id !== taskToDelete));
      setTaskToDelete(null);
    }
  };

  const isEditing = editTaskId !== null;
  const editingTask = isEditing ? tasks.find(t => t.id === editTaskId) : undefined;

  return (
    <div style={{ minHeight: '100vh', background: '#f6f8fa', padding: 0, position: 'relative' }}>
      <div style={{ background: '#fff', padding: '32px 40px 16px 40px', boxShadow: '0 2px 8px #0001', borderBottom: '1px solid #ececec', position: 'relative' }}>
        <button
          className="btn btn-primary"
          style={{ position: 'absolute', top: 32, right: 40, zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, padding: '8px 18px' }}
          onClick={() => { setShowModal(true); setEditTaskId(null); }}
        >
          <Icon name="plus" size={22} color="#fff" /> Add Task
        </button>
        <div style={{ textAlign: 'left', margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Eisenhower Matrix</div>
        <p style={{ textAlign: 'left', color: '#666', margin: '4px 0 0 0', fontSize: 14, fontWeight: 400 }}>
          Organize your tasks by importance and urgency
        </p>
      </div>
      <TaskForm
        open={showModal}
        onClose={() => { setShowModal(false); setEditTaskId(null); }}
        onSubmit={isEditing ? (task => { handleUpdateTask(task); setShowModal(false); setEditTaskId(null); }) : (task => { handleAddTask(task); setShowModal(false); })}
        initialValues={isEditing && editingTask ? {
          title: editingTask.title,
          description: editingTask.description,
          important: editingTask.important,
          urgent: editingTask.urgent,
          deadline: editingTask.deadline,
          timeEstimate: editingTask.timeEstimate,
          completedAt: editingTask.completedAt,
        } : undefined}
        headerText={isEditing ? 'Edit Task' : 'Add New Task'}
        submitButtonText={isEditing ? 'Update Task' : 'Add Task'}
      />
      <ConfirmationDialog
        open={showDeleteConfirm}
        onClose={() => { setShowDeleteConfirm(false); setTaskToDelete(null); }}
        onConfirm={confirmDeleteTask}
        title="Delete Task"
        message="Are you sure? This cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
      <div style={{ padding: 24 }}>
        <MatrixBoard
          tasks={tasks}
          onTaskStateChange={handleTaskStateChange}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <Overview tasks={tasks} />
      </div>
    </div>
  );
};

export default EisenhowerMatrixApp;
