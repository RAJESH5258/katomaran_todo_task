import { useState } from 'react';
import { Box, Button, TextField, MenuItem } from '@mui/material';

const TaskForm = ({ onSubmit, initialData = {} }) => {
  const [task, setTask] = useState({ title: initialData.title || '', description: initialData.description || '', status: initialData.status || 'pending', due_date: initialData.due_date || '' });

  const handleChange = (e) => { setTask({ ...task, [e.target.name]: e.target.value }); };

  const handleSubmit = (e) => { e.preventDefault(); onSubmit(task); };

  const formatDatee = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date)) return '-';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  return (<Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
    <TextField fullWidth margin="normal" label="Title" name="title" value={task.title} onChange={handleChange} required />
    <TextField fullWidth margin="normal" label="Description" name="description" value={task.description} onChange={handleChange} multiline rows={4} required />
    <TextField fullWidth margin="normal" select label="Status" name="status" value={task.status} onChange={handleChange} required>
      <MenuItem value="Pending">Pending</MenuItem>
      <MenuItem value="In Progress">In Progress</MenuItem>
      <MenuItem value="Completed">Completed</MenuItem>
    </TextField>
    <TextField fullWidth margin="normal" label="Due Date" name="due_date" type="date" InputLabelProps={{ shrink: true }} value={formatDatee(task.due_date)} onChange={handleChange} required />
    <Button type="submit" variant="contained" sx={{ mt: 2 }}> {initialData.id ? 'Update Task' : 'Add Task'}       </Button>     </Box>);
};

export default TaskForm; 