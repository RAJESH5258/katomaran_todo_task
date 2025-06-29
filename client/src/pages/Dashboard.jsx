import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  List,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskTable from '../components/TaskItem';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await axios.post('/api/tasks', taskData);
      fetchTasks();
      setOpenDialog(false);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await axios.put(`/api/tasks/${currentTask.id}`, taskData);
      fetchTasks();
      setOpenDialog(false);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await axios.put(`/api/tasks/${task.id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setOpenDialog(true);
  };

  const handleAddClick = () => {
    setCurrentTask(null);
    setOpenDialog(true);
  };

  const completedCount = tasks.filter(task => task.status === 'completed').length;
  const pendingCount = tasks.filter(task => task.status !== 'completed').length;
  const progresscount = tasks.filter(task => task.status === 'in progress').length;

  return (
    <Container maxWidth="lg" sx={{
          backgroundColor: 'white',
          borderRadius: 3,
          padding: 4,
          boxShadow: 3,
          marginTop: 4,
        }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Welcome {user?.name}</Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={handleAddClick}>
            Add Task
          </Button>
          <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      <Box display="flex" gap={3} mb={3}>
        <Box
          sx={{
            flex: 1,
            p: 2,
            bgcolor: 'success.main',
            color: 'white',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">Completed</Typography>
          <Typography variant="h4">{completedCount}</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 2,
            bgcolor: 'warning.main',
            color: 'white',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">Pending</Typography>
          <Typography variant="h4">{pendingCount}</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 2,
            bgcolor: 'secondary.main',
            color: 'white',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">Progress</Typography>
          <Typography variant="h4">{progresscount}</Typography>
        </Box>
      </Box>

      <List>
        {
          <TaskTable
            tasks={tasks}
            onEdit={handleEditClick}     // this opens edit dialog
            onDelete={handleDeleteTask}  // this deletes the task
            onToggleStatus={handleToggleStatus}
          />
          //         tasks.map((task) => (
          //          <TaskTable
          //   tasks={tasks}
          //   onEdit={handleEditClick}
          //   onDelete={handleDeleteTask}
          //   onToggleStatus={handleToggleStatus}
          // />
          //         ))
        }
      </List>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <TaskForm
            onSubmit={currentTask ? handleUpdateTask : handleCreateTask}
            initialData={currentTask || {}}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
