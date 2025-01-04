const express = require('express');
const router = express.Router();
const logger = require('./logger');
const { initDB } = require('./db');

// CREATE
router.post('/', async (req, res) => {
  const { name, familyName, position, address, phone, email } = req.body;
  logger.debug({ body: req.body }, 'Creating employee');

  // Basic validation
  if (!name || !familyName || !position || !address || !phone || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const pool = await initDB();
    const [result] = await pool.query(
      `INSERT INTO employees (name, familyName, position, address, phone, email)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, familyName, position, address, phone, email]
    );
    const insertedId = result.insertId;
    logger.info({ id: insertedId }, 'Employee created');

    return res.status(201).json({
      id: insertedId, name, familyName, position, address, phone, email
    });
  } catch (error) {
    logger.error(error, 'Error creating employee');
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  logger.debug('Fetching all employees');
  try {
    const pool = await initDB();
    const [rows] = await pool.query('SELECT * FROM employees');
    return res.json(rows);
  } catch (error) {
    logger.error(error, 'Error fetching employees');
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  logger.debug({ id }, 'Fetching employee by ID');

  try {
    const pool = await initDB();
    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    return res.json(rows[0]);
  } catch (error) {
    logger.error(error, 'Error fetching employee');
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, familyName, position, address, phone, email } = req.body;
  logger.debug({ id, body: req.body }, 'Updating employee');

  try {
    const pool = await initDB();
    const [existing] = await pool.query('SELECT id FROM employees WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await pool.query(
      `UPDATE employees
       SET name=?, familyName=?, position=?, address=?, phone=?, email=?
       WHERE id=?`,
      [name, familyName, position, address, phone, email, id]
    );

    logger.info({ id }, 'Employee updated');
    return res.json({ id, name, familyName, position, address, phone, email });
  } catch (error) {
    logger.error(error, 'Error updating employee');
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  logger.debug({ id }, 'Deleting employee');

  try {
    const pool = await initDB();
    const [existing] = await pool.query('SELECT id FROM employees WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await pool.query('DELETE FROM employees WHERE id = ?', [id]);
    logger.info({ id }, 'Employee deleted');
    return res.status(204).send();
  } catch (error) {
    logger.error(error, 'Error deleting employee');
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
