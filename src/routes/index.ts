import express, { Router, json } from 'express'
import { AuthMiddleware } from '../middleware/auth'
import { UsersController } from '../controllers/users-controller'
import { config } from 'dotenv'
import { ValidationMiddleware, userSchema } from '../middleware/validation'
import { CoursesController } from '../controllers/courses-controller'

const app = express()

config()
app.use(json())

const publicRouter = Router()
const privateRouter = Router()

privateRouter.use(AuthMiddleware)

publicRouter.post('/register', ValidationMiddleware(userSchema), UsersController.create)
publicRouter.post('/login', UsersController.login)

privateRouter.get('/courses', CoursesController.findAll)
privateRouter.get('/courses/:id', CoursesController.findOne)

app.use('/', publicRouter)
app.use('/auth', privateRouter)

export { app }