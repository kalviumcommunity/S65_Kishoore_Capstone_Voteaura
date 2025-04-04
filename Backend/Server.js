const express=require('express')
const app=express()
const connectDB=require('./Config/db')
const PORT=process.env.PORT||5000
const router=require('./Routes')
const cors=require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use('/api',router)

app.get('/',(req,res)=>{
  try{
    res.send("Welcome to VoteAura API")
  }catch(error){
    res.status(500).send("Server error")
  }
})

app.listen(PORT,()=>{
  connectDB()
  console.log(`Server running on port ${PORT}`)
})
