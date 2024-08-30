import express from "express";
import morgan from "morgan";
import router from "./routes/payment.routes.js";
import cors from "cors";
import { PORT } from "./config.js";
const app = express()

app.listen(PORT)
console.log(`http://localhost:${PORT}`)


app.use(cors())
app.use(express.json())
app.use(router)
app.use(morgan('dev'))







app.get('/', (req, res) => {
    res.send('messi')
})