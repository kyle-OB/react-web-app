import mongoose from 'mongoose';

// Define the schema for TaskType
const taskTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Ensure name is required
    unique: true,    // Ensure name is unique
    trim: true,      // Remove leading/trailing spaces
  },
  color: {
    type: String,
    required: true,  // Ensure color is required
    trim: true,      // Remove leading/trailing spaces
  },
}, {
  timestamps: true,  // Add createdAt and updatedAt fields
});

// Create and export the model based on the schema
const TaskType = mongoose.model('TaskType', taskTypeSchema);
export default TaskType;
