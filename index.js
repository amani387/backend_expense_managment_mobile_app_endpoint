require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Import routes
const expenses = require('./routes/expenses');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected to Atlas...'))
.catch(err => {
  console.error('MongoDB Connection Error: ', err.message);
  process.exit(1); // Exit process with failure
});

// Mount routers
app.use('/api/expenses', expenses);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Basic route
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
