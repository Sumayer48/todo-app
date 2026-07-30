require('dotenv').config();

const express = require('express');

const cors = require('cors');

const connectDB = require('./config/db');
const todoRouters = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes')

const path = require('path');
const fs = require('fs');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorMiddleware');

const logger = require('./middleware/logger');


const app = express();

connectDB();

app.use(express.json());
app.use(cors({
    origin: "http://todo-app-1-qfuw.onrender.com",
    credentials: true,
}));

app.use('/upload', express.static(path.join(__dirname, 'uploads')));

app.use(logger);

app.use('/api/v1/todos', todoRouters);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/uploads', uploadRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
















