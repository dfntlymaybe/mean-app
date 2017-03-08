const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/register', (req, res) => {
  res.send('register works');
});

router.get('/login', (req, res) => {
  res.send('login works');
});

module.exports = router;