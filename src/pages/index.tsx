import React, { useEffect, useState } from 'react';
import TaskForm, { TaskFormInput } from '../components/molecules/TaskForm';
import MatrixBoard from '../components/organisms/MatrixBoard';
import Overview from '../components/organisms/Overview';
import { Task, TaskState } from '../components/molecules/TaskCard';
import Icon from '../components/atoms/Icon';
import { loadTasks, saveTasks, generateId } from '../lib/persistence';

const EisenhowerMatrixApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

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
        state: 'created',
      },
    ]);
  };

  const handleUpdateTask = (task: TaskFormInput) => {
    setTasks(prev => prev.map(t =>
      t.id === editTaskId
        ? { ...t, ...task }
        : t
    ));
  };

  const handleTaskStateChange = (taskId: string, state: TaskState) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, state } : t));
  };

  const handleEditTask = (taskId: string) => {
    setEditTaskId(taskId);
    setShowModal(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
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
        } : undefined}
        headerText={isEditing ? 'Edit Task' : 'Add New Task'}
        submitButtonText={isEditing ? 'Update Task' : 'Add Task'}
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
