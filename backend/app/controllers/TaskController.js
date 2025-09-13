import Task from '../models/Task.js';
import TaskType from '../models/TaskType.js';

const index = async (req, res) => {    
    const tasks = await Task.find();
    res.status(200).json(tasks);
}

const show = async (req, res) => {  
    const { id } = req.params;
    try {
        // Find the task by ID
        const task = await Task.findById(id);
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (err) {
        console.error('Error fetching task:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const insert = ((req, res) => {
    let {name} = req.body;
    TaskType.findOne({name:"New"})
        .then((type)=>{
            Task.create({
                type_id: type._id,
                name: name,
            }).then((obj) => {
                Task.find().then((data)=>{
                    res.status(200).json(data);
                });                
            }).catch((err) => {
                console.error('Error for creating a task: ', err);
                res.status(400).send(err);
            });
        });
  });

  const update = async (req, res) => {
    const { id } = req.params;
    const { name, type_id } = req.body;  // Assuming `name` and `type_id` are provided in the request body

    try {
        // Find the task by ID and update it
        const updatedTask = await Task.findByIdAndUpdate(id, { name, type_id }, { new: true });
        
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Fetch the updated list of tasks
        const tasks = await Task.find();
        
        res.status(200).json(tasks);  // Return the updated list of tasks
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


const remove = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and remove the task by ID
        const deletedTask = await Task.findByIdAndDelete(id);
        
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Fetch the updated list of tasks
        const tasks = await Task.find();
        
        res.status(200).json(tasks);  // Return the updated list of tasks
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const TaskController = {index, show, insert, update, remove};
