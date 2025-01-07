require('dotenv').config();

const express = require('express');
const app = express();
const ordersRouter = require('./routers/api/v1/orders');
const usersRouter = require('./routers/api/v1/users');
const adminRouter = require('./routers/api/v1/admin');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const http = require('http');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Enable CORS
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Routes
app.use('/api/v1/orders', ordersRouter); // Remove authentication for ordersRouter
app.use('/api/v1/users', passport.authenticate('jwt', {session: false}), usersRouter);
app.use('/api/v1/admin', adminRouter);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Create HTTP server
const server = http.createServer(app);


// PORT
const port = process.env.PORT || 3000;

// Start server
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
