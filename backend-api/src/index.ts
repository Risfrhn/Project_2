import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes will go here
app.get('/api', (req, res) => {
    res.json({ message: 'Backend API is running' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
