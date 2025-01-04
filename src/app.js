const express = require('express');
const logger = require('./logger');
const employeesRouter = require('./employees.router');

const app = express();

// Body parser
app.use(express.json());

// Simple logger middleware
app.use((req, res, next) => {
  logger.debug({ method: req.method, url: req.url }, 'Incoming request');
  next();
});

// Health check
app.get('/health', (req, res) => {
  return res.json({ status: 'OK' });
});

// Employees CRUD
app.use('/employees', employeesRouter);

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
