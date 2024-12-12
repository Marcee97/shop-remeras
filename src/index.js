import express from "express";
import morgan from "morgan";
import router from "./routes/payment.routes.js";
import cors from "cors";
import { PORT } from "./config.js";
import { ORIGIN } from "./config.js";

import { ExpressAuth } from "@auth/express"

const app = express()

app.listen(PORT)
//console.log(`http://localhost:${PORT}`)


app.use(cors({
    origin: ORIGIN
}))
app.use(express.json())
app.use(router)
app.use(morgan('dev'))
app.set("trust proxy", true)
app.use("/auth/*", ExpressAuth({ providers: [] }))

/*
{
    "user": {
      "name": "Marcee",
      "email": "marceloquadrilatero@gmail.com",
      "image": "https://avatars.githubusercontent.com/u/124194380?v=4"
    },
    "expires": "2025-01-10T20:41:11.921Z"
  }

*/

app.get('/', (req, res) => {
    res.send('messi')
})