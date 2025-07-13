import React, { useEffect, useState } from 'react';
import TaskForm, { TaskFormInput } from '../components/molecules/TaskForm';
import MatrixBoard from '../components/organisms/MatrixBoard';
import Overview from '../components/organisms/Overview';
import { Task, TaskState } from '../components/molecules/TaskCard';
import Icon from '../components/atoms/Icon';

// Persistence abstraction (can swap out localStorage for DB later)
const TASKS_KEY = 'eisenhower-tasks';
const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};
const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

const generateId = () => Math.random().toString(36).slice(2, 10);

const EisenhowerMatrixApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

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

  const handleTaskStateChange = (taskId: string, state: TaskState) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, state } : t));
  };

  const handleEditTask = () => {
    // For simplicity, editing can be implemented as a modal or inline in the future
    alert('Edit functionality coming soon!');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fafbfc', padding: 24, position: 'relative' }}>
      <button
        className="btn btn-primary"
        style={{ position: 'absolute', top: 32, right: 40, zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, fontSize: 18 }}
        onClick={() => setShowModal(true)}
      >
        <Icon name="plus" size={22} color="#fff" /> Add Task
      </button>
      <TaskForm open={showModal} onClose={() => setShowModal(false)} onSubmit={task => { handleAddTask(task); setShowModal(false); }} />
      <h1 style={{ textAlign: 'center', margin: '16px 0 8px 0' }}>Eisenhower Matrix</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: 32 }}>
        Organize your tasks by importance and urgency
      </p>
      <MatrixBoard
        tasks={tasks}
        onTaskStateChange={handleTaskStateChange}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
      <Overview tasks={tasks} />
    </div>
  );
};

export default EisenhowerMatrixApp;
