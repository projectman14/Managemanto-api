import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { main } from './config/connectDatabse.js'
import { router } from './routes/index.js'
dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'test success'
    })
})

app.use('/api', router)

main().then(() => {
    app.listen(PORT, () => {
        console.log('server started at ' + PORT)
    })
})

export default app