import express, { Router } from 'express'

const app = express()

const publicRouter = Router()
const privateRouter = Router()

publicRouter.post('/register', () => {})
publicRouter.post('/login', () => {})

privateRouter.get('/courses', () => {})

app.use('/', publicRouter)
app.use('/auth', privateRouter)

export { app }