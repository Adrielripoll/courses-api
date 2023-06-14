import { JwtPayload } from 'jsonwebtoken'
import { JwtPayloadUser } from '../interface/JwtUser'

interface JwtPayloadUser {
	userId: number,
	email: string,
	iat: number,
}

declare global {
    declare namespace Express {
        export interface Request {
            user?: JwtPayloadUser | undefined,
        }
    }
}