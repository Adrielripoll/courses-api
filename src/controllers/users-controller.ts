import { Request, Response } from 'express'

export class UsersController {
    async create(request: Request, response: Response){
        /*
            const userPayload = request.body
            const userAlreadyExists = await usersRepository.findBy({ email: userPayload.email })

            if(!userAlreadyExists){
                return response.status(400).json({ message: 'User already exists' })
            }
    
            const newUser = await usersRepository.create(userPayload)

            return response.status(201).json(newUser)
        */
    }

    async login(request: Request, response: Response){}
}