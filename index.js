import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const USER_ID = process.env.USER_ID
const ACCESS_TOKEN = process.env.ACCESS_TOKEN


app.use(cors())
app.use(express.json())

const sendEmail = async (req, res) => {
    const emailContent = req.body
    const data = {
        service_id: 'default_service',
        template_id: 'template_rltdtcs',
        user_id: USER_ID,
        accessToken: ACCESS_TOKEN,
        template_params: emailContent
    }
    try {
        await axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
        res.status(201).json({ message: 'Your message was successful', email: emailContent})
    } catch (error) {
        res.status(400).json({ error: error })
    }

}

app.post('/', sendEmail)

app.listen(port, ()=> console.log('listening on port 3000'))