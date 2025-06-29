import { useState } from 'react'; import { Box, Button, TextField, MenuItem } from '@mui/material';

const TaskForm = ({ onSubmit, initialData = {} }) => {
    const [task, setTask] = useState({ title: initialData.title || '', description: initialData.description || '', status: initialData.status || 'pending', due_date: initialData.due_date || '' });

    const handleChange = (e) => { setTask({ ...task, [e.target.name]: e.target.value }); };

    const handleSubmit = (e) => { e.preventDefault(); onSubmit(task); };

    return (<Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>       <TextField fullWidth margin="normal" label="Title" name="title" value={task.title} onChange={handleChange} required />       <TextField fullWidth margin="normal" label="Description" name="description" value={task.description} onChange={handleChange} multiline rows={4} />       <TextField fullWidth margin="normal"
        select label="Status" name="status" value={task.status} onChange={handleChange}       >         <MenuItem value="pending">Pending</MenuItem>         <MenuItem value="in_progress">In Progress</MenuItem>         <MenuItem value="completed">Completed</MenuItem>       </TextField>       <TextField fullWidth margin="normal" label="Due Date" name="due_date" type="date" InputLabelProps={{ shrink: true }} value={task.due_date} onChange={handleChange} />       <Button type="submit" variant="contained" sx={{ mt: 2 }}>         {initialData.id ? 'Update Task' : 'Add Task'}       </Button>     </Box>);
};

export default TaskForm; 