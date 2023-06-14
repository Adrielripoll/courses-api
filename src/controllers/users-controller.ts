import { Request, Response } from 'express'
import { UsersRepository } from '../repositories/users'
import { UserPayload } from '../interfaces/user'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export class UsersController {
    static async create(request: Request, response: Response){
        const userPayload: UserPayload = request.body

        const userAlreadyExists = UsersRepository.findBy('email', userPayload.email)
        
        if(userAlreadyExists){
            return response.status(409).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(userPayload.password, 10)

        const newUser = UsersRepository.create({
            email: userPayload.email,
            name: userPayload.name,
            password: hashedPassword
        })

        return response.status(201).json(newUser)
    }

    static async login(request: Request, response: Response){
        const { email, password } = request.body

        const user = UsersRepository.findBy('email', email)

        if(!user) {
            return response.status(400).json({ message: 'Invalid credentials' })
        }

        const compare = await bcrypt.compare(password, user.password)
        
        if(!compare) {
            return response.status(400).json({ message: 'Invalid credentials' })
        }

        try{
            const token = jwt.sign({
                userId: user.id,
                email: user.email,
                name: user.name 
            }, process.env.JWT_SECRET!)

            return response.status(200).json({ ...user, token })
        }catch(error){
            return response.status(500).json({ message: 'There was an error. Try again later.'})
        }
    }
}