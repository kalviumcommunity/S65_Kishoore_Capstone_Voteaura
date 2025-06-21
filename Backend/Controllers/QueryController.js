const Marketplace = require('twilio/lib/rest/Marketplace')
const Query=require('../Models/QueryModel')
const nodemailer = require('nodemailer')

const sendQueryResponse = async (req, res) => {
    const { email, subject, message } = req.body
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            text: message
        })

        res.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error: error.message })
    }
}

const querymode=async(req,res)=>{
    try{
        const {email,subject,message}=req.body
        const newQuery=new Query({
            email,subject,message
        })
        await newQuery.save();
        res.status(200).json({message:'Query sent Successfully'})

    }catch(error){
        res.status(401).json({message:'error in raising the query',error:error.message})

    }
}

const getquery=async(req,res)=>{
    try{
        const query = await Query.find()
        res.status(200).send(query)

    }catch(error){
        res.status(401).json({message:'error in fetching the data',error:error.message})

    }
}

const marsolved = async (req, res) => {
    try {
        await Query.findByIdAndUpdate(req.params.id, { solved: true });
        res.status(200).json({ message: 'Marked as solved' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark as solved' });
    }
}

module.exports={querymode,getquery,sendQueryResponse,marsolved}





