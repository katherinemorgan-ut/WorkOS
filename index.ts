import express, { Application } from "express"
import 'dotenv/config'
import router from "./routes/index"
import morgan from 'morgan'

const app: Application = express()

const port: string = process.env.PORT || '8000'

app.use('/public', express.static('public'))

app.use(express.urlencoded({ extended: false }))

app.use(morgan('dev'))

app.use('/', router)

app.listen(port, (): void => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})