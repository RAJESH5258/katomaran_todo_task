import { useState } from 'react'; import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Menu, MenuItem } from '@mui/material'; import { Edit, Delete, MoreVert } from '@mui/icons-material';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
    const [anchorEl, setAnchorEl] = useState(null); const open = Boolean(anchorEl);

    const handleMenuOpen = (e) => { setAnchorEl(e.currentTarget); };

    const handleMenuClose = () => { setAnchorEl(null); };

    return (<ListItem>       <Checkbox edge="start" checked={task.status === 'completed'} onChange={() => onToggleStatus(task)} />       <ListItemText primary={task.title} secondary={task.description} sx={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }} />       <ListItemSecondaryAction>         <IconButton edge="end" onClick={handleMenuOpen}>           <MoreVert />         </IconButton>         <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}         >
        <MenuItem onClick={() => { onEdit(task); handleMenuClose(); }}>             <Edit fontSize="small" sx={{ mr: 1 }} /> Edit           </MenuItem>           <MenuItem onClick={() => { onDelete(task.id); handleMenuClose(); }}>             <Delete fontSize="small" sx={{ mr: 1 }} /> Delete           </MenuItem>         </Menu>       </ListItemSecondaryAction>     </ListItem>);
};

export default TaskItem;
