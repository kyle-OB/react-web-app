import TaskType from '../models/TaskType.js';
import Task from '../models/Task.js';

const index = async (req, res) => {
    const defaultTypes = [
        { name: 'New', color: 'red' },
        { name: 'In Progress', color: 'blue' },
        { name: 'Completed', color: 'green' },
      ];
    
    const addDefaultRecordsIfEmpty = async () => {
        try {
            // Check if there are any documents in the collection
            const typeCount = await TaskType.countDocuments();
            
            if (typeCount === 0) {
            // Insert the default records
            console.log('No records found, inserting default task types...');
            await TaskType.insertMany(defaultTypes);
            console.log('Default task types inserted successfully!');
            } else {
            console.log('Skipping default insertion.');
            }
        } catch (err) {
            console.error('Error adding default records:', err);
        }
    };

    await addDefaultRecordsIfEmpty();

    // get a list of task types and send back to the front end
    try {
        const taskTypes = await TaskType.find(); // Retrieve all task types
        const tasks = await Task.find(); // Retrieve all tasks

        // Send both task types and tasks in the response
        res.status(200).json({ taskTypes, tasks });
    } catch (err) {
        console.error('Error retrieving task types or tasks:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export default index;
    
export const TaskTypeController ={index};