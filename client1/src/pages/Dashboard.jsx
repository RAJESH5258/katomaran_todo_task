import { useState, useEffect } from 'react'; import { Container, Typography, Button, List, Box, Dialog, DialogTitle, DialogContent } from '@mui/material'; import { useAuth } from '../context/AuthContext'; import axios from 'axios'; import TaskForm from '../components/TaskForm'; import TaskItem from '../components/TaskItem';

const Dashboard = () => {
    const { user, logout } = useAuth(); const [tasks, setTasks] = useState([]); const [openDialog, setOpenDialog] = useState(false); const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => { fetchTasks(); }, []);

    const fetchTasks = async () => { try { const res = await axios.get('/api/tasks'); setTasks(res.data); } catch (err) { console.error(err); } };

    const handleCreateTask = async (taskData) => { try { await axios.post('/api/tasks', taskData); fetchTasks(); setOpenDialog(false); } catch (err) { console.error(err); } };

    const handleUpdateTask = async (taskData) => { try { await axios.put(`/api/tasks/${currentTask.id}`, taskData); fetchTasks(); setOpenDialog(false); } catch (err) { console.error(err); } };

    const handleDeleteTask = async (taskId) => { try { await axios.delete(`/api/tasks/${taskId}`); fetchTasks(); } catch (err) { console.error(err); } };

    const handleToggleStatus = async (task) => { try { const newStatus = task.status === 'completed' ? 'pending' : 'completed'; await axios.put(`/api/tasks/${task.id}`, { status: newStatus }); fetchTasks(); } catch (err) { console.error(err); } };

    const handleEditClick = (task) => { setCurrentTask(task); setOpenDialog(true); };

    const handleAddClick = () => { setCurrentTask(null); setOpenDialog(true); };

    return (<Container maxWidth="md">       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>         <Typography variant="h4">Welcome, {user?.name}</Typography>         <Button variant="contained" color="error" onClick={logout}>           Logout         </Button>       </Box>

        <Box display="flex" justifyContent="flex-end" mb={2}>         <Button variant="contained" onClick={handleAddClick}>           Add Task         </Button>       </Box>

        <List>         {tasks.map(task => (<TaskItem key={task.id} task={task} onEdit={handleEditClick} onDelete={handleDeleteTask} onToggleStatus={handleToggleStatus} />))}       </List>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>         <DialogTitle>{currentTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>         <DialogContent>           <TaskForm onSubmit={currentTask ? handleUpdateTask : handleCreateTask} initialData={currentTask || {}} />         </DialogContent>       </Dialog>     </Container>);
};

export default Dashboard; 