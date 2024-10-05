const express = require('express');
const router = express.Router();

let users = [];

router.post('/join', (req, res) => {
  const { username } = req.body;
  const user = { id: req.socket.id, username };
  users.push(user);
  res.json(users);
});

router.post('/leave', (req, res) => {
  users = users.filter((user) => user.id !== req.socket.id);
  res.json(users);
});

router.get('/users', (req, res) => {
  res.json(users);
});

module.exports = router;