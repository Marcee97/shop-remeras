import express from "express";
import morgan from "morgan";
import router from "./routes/payment.routes.js";
import cors from "cors";
const app = express()

app.listen(3000)
console.log('http://localhost:3000')


app.use(cors())
app.use(express.json())
app.use(router)
app.use(morgan('dev'))







app.get('/', (req, res) => {
    res.send('messi')
})