import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import { Edit, Delete, MoreVert } from '@mui/icons-material';

const TaskTable = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuTaskId, setMenuTaskId] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setMenuTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuTaskId(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date)) return '-';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No tasks found.
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow
                key={task.id}
                sx={{
                  textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                  bgcolor: task.status === 'completed' ? 'action.selected' : 'inherit',
                }}
              >
                <TableCell>
                  <Checkbox
                    checked={task.status === 'completed'}
                    onChange={() => onToggleStatus(task)}
                    color="primary"
                    disabled={task.status === 'completed'}
                  />
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{formatDate(task.due_date)}</TableCell>
                <TableCell sx={{
                  color:
                    task.status === 'completed' ? 'green' :
                      task.status === 'pending' ? 'red' :
                        task.status === 'in progress' ? 'orange' :
                          'inherit',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}>{task.status}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, task.id)}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open && menuTaskId === task.id}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem
                      onClick={() => {
                        onEdit(task);
                        handleMenuClose();
                      }}
                    >
                      <Edit fontSize="small" sx={{ mr: 1 }} />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        onDelete(task.id);
                        handleMenuClose();
                      }}
                    >
                      <Delete fontSize="small" sx={{ mr: 1 }} />
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TaskTable;
