import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const AuthMiddleware = (request: Request, response: Response, next: NextFunction) => {
    
    const token = request.header('authorization-token')

    if(!token) {
        return response.status(401).json({ message: 'Unauthorized' })  
    }
        
    try{
        request.user = verify(token, process.env.JWT_SECRET!)
        next()
    }catch(error){
        return response.status(401).json({ message: 'Unauthorized' })
    }
}