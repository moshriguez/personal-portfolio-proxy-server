import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import emailjs from "emailjs-com"

dotenv.config()

const app = express()
const port = 3000
const USER_ID = process.env.USER_ID


app.use(cors())
app.use(express.json())

const sendEmail = async (req, res) => {
    const emailContent = req.body
    console.log(emailContent)
    try {
        await emailjs.send(
            'default_service',
            'template_rltdtcs',
            emailContent,
            USER_ID
        )
        res.status(201).json({ message: 'Your message was successful', email: emailContent})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

app.post('/', sendEmail)

app.listen(port, ()=> console.log('listening on port 3000'))