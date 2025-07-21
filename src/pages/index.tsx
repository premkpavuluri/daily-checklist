import React, { useEffect, useState } from 'react';
import TaskForm, { TaskFormInput } from '../components/molecules/TaskForm';
import MatrixBoard from '../components/organisms/MatrixBoard';
import Overview from '../components/organisms/Overview';
import { Task, TaskState } from '../components/molecules/TaskCard';
import Icon from '../components/atoms/Icon';
import ConfirmationDialog from '../components/molecules/ConfirmationDialog';
import TagFilterDropdown from '../components/molecules/TagFilterDropdown';
import SearchBar from '../components/molecules/SearchBar';
import { loadTasks, saveTasks, generateId } from '../lib/persistence';
import { getCurrentDateISO } from '../lib/dateUtils';
import { getAllTags, getAllAvailableTags, getTagCounts, filterTasksByTags, cleanupUnusedCustomTags } from '../lib/tagUtils';
import { searchTasksByText } from '../lib/searchUtils';

const EisenhowerMatrixApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
    // Clean up unused custom tags on app start
    if (loadedTasks.length > 0) {
      cleanupUnusedCustomTags(loadedTasks);
    }
  }, []);

  useEffect(() => {
    saveTasks(tasks);
    // Clean up unused custom tags whenever tasks change
    if (tasks.length > 0) {
      cleanupUnusedCustomTags(tasks);
    }
  }, [tasks]);

  const handleAddTask = (task: TaskFormInput) => {
    setTasks(prev => {
      const newTasks = [
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
          tags: task.tags && task.tags.length > 0 ? task.tags : ['others'],
          state: 'created' as TaskState,
        },
      ];
      
      // Clean up unused tags after adding new task
      if (newTasks.length > 0) {
        cleanupUnusedCustomTags(newTasks);
      }
      
      return newTasks;
    });
  };

  const handleUpdateTask = (task: TaskFormInput) => {
    setTasks(prev => {
      const updatedTasks = prev.map(t => {
        if (t.id === editTaskId) {
          const updatedTask = { ...t, ...task };
          // Only apply default tag if no tags are provided
          updatedTask.tags = task.tags && task.tags.length > 0 ? task.tags : ['others'];
          // Preserve completion date if task is already done
          if (t.state === 'done' && t.completedAt && !task.completedAt) {
            updatedTask.completedAt = t.completedAt;
          }
          return updatedTask;
        }
        return t;
      });
      
      // Clean up unused tags after task update
      if (updatedTasks.length > 0) {
        cleanupUnusedCustomTags(updatedTasks);
      }
      
      return updatedTasks;
    });
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
      setTasks(prev => {
        const updatedTasks = prev.filter(t => t.id !== taskToDelete);
        // Clean up unused tags after task deletion
        if (updatedTasks.length > 0) {
          cleanupUnusedCustomTags(updatedTasks);
        }
        return updatedTasks;
      });
      setTaskToDelete(null);
    }
  };

  const isEditing = editTaskId !== null;
  const editingTask = isEditing ? tasks.find(t => t.id === editTaskId) : undefined;
  const availableTags = getAllAvailableTags();
  const existingTags = [...new Set([...availableTags, ...getAllTags(tasks)])];
  const tagCounts = getTagCounts(tasks);
  
  // Apply search and tag filters
  const searchFilteredTasks = searchTasksByText(tasks, searchQuery);
  const filteredTasks = filterTasksByTags(searchFilteredTasks, selectedTags, 'OR');

  return (
    <div style={{ minHeight: '100vh', background: '#f6f8fa', padding: 0, position: 'relative' }}>
      <div style={{ background: '#fff', padding: '32px 40px 16px 40px', boxShadow: '0 2px 8px #0001', borderBottom: '1px solid #ececec', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 32, right: 40, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
          <SearchBar
            onSearch={setSearchQuery}
            allTasks={tasks}
            placeholder="Search tasks..."
            style={{ width: '300px' }}
          />
          <TagFilterDropdown
            allTags={existingTags}
            selectedTags={selectedTags}
            onTagSelect={(tag: string) => setSelectedTags(prev => [...prev, tag])}
            onTagDeselect={(tag: string) => setSelectedTags(prev => prev.filter(t => t !== tag))}
            onClearAll={() => setSelectedTags([])}
            tagCounts={tagCounts}
            isOpen={showFilterDropdown}
            onToggle={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <button
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, padding: '8px 18px', background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer' }}
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <Icon name="filter" size={18} color="#6b7280" /> 
              Filter {selectedTags.length > 0 && `(${selectedTags.length})`}
            </button>
          </TagFilterDropdown>
          <button
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, padding: '8px 18px' }}
            onClick={() => { setShowModal(true); setEditTaskId(null); }}
          >
            <Icon name="plus" size={22} color="#fff" /> Add Task
          </button>
        </div>
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
          tags: editingTask.tags,
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
          tasks={filteredTasks}
          onTaskStateChange={handleTaskStateChange}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <Overview tasks={filteredTasks} />
      </div>
    </div>
  );
};

export default EisenhowerMatrixApp;
