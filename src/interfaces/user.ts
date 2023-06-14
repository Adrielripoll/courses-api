import { UUID } from 'crypto'

export interface UserPayload extends Omit<User, 'id'> {
    passwordConfirm?: string
}

export interface User  {
    id: UUID
    name: string
    email: string
    password: string
}
