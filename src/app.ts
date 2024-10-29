import express, { Application } from 'express'
import { UsersRouter } from './modules/users/users.route'

const app: Application = express()

// Ensure JSON parsing middleware is added
app.use(express.json())

app.use('/api/v1/users', UsersRouter)

export default app
