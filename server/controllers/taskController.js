const { Task } = require('../models'); 
 
exports.getAllTasks = async (req, res) => {   try {     const tasks = await Task.findAll({ where: { user_id: req.userId } });     res.json(tasks);   } catch (err) {     res.status(500).json({ message: err.message });   } }; 
 
exports.createTask = async (req, res) => {   try {     const task = await Task.create({       ...req.body,       user_id: req.userId     });     res.status(201).json(task);   } catch (err) {     res.status(400).json({ message: err.message });   } }; 
 
exports.getTask = async (req, res) => {   try {     const task = await Task.findOne({       where: { id: req.params.id, user_id: req.userId }     });     if (!task) return res.status(404).json({ message: 'Task not found' });     res.json(task);   } catch (err) {     res.status(500).json({ message: err.message });   } }; 
 
exports.updateTask = async (req, res) => {   try {     const [updated] = await Task.update(req.body, {       where: { id: req.params.id, user_id: req.userId }     });     if (!updated) return res.status(404).json({ message: 'Task not found' });     const updatedTask = await Task.findByPk(req.params.id);     res.json(updatedTask);   } catch (err) {     res.status(400).json({ message: err.message }); 
  } }; 
 
exports.deleteTask = async (req, res) => {   try {     const deleted = await Task.destroy({       where: { id: req.params.id, user_id: req.userId }     });     if (!deleted) return res.status(404).json({ message: 'Task not found' });     res.status(204).end();   } catch (err) {     res.status(500).json({ message: err.message });   } };