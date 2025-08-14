const express = require('express');
const app = express();
const connectDB = require('./Config/db');
const PORT = process.env.PORT || 5000;
const router = require('./Routes');
const cors =require('cors')
const path = require('path');

require('dotenv').config(); 

app.use(cors({
  origin:[ 'http://localhost:5173', 'https://voteaura.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));
app.use(express.json());
app.use('/api', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.get('/', (req, res) => {
  try {
    res.send("Hello world");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.listen(PORT, async() => {
  try{
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  }catch(error){
    console.log(error)
  }
});