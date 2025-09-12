import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import apiRouter from './routes/api.js';
connectDB();

const app = express(); // Create an instance of the Express application
const PORT = process.env.PORT || 3000; // Define the port to listen on

app.use('/api', apiRouter);
app.use(cors()); // Enable CORS for all incoming requests

app.use(express.json()); // Parse JSON request bodies

// Sample route for text response
app.get('/', (req, res) => {
    res.send('Hello, World!'); // Respond with a simple text message
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});