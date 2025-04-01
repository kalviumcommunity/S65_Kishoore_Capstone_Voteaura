const express = require('express');
const app = express();
const connectDB = require('./Config/db');
const PORT = process.env.PORT || 5000;
const router = require('./Routes');
const path = require('path');


require('dotenv').config(); 

app.use(express.json());
app.use('/api', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  try {
    res.send("Hello world");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});

