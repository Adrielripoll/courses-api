import { User, UserPayload } from "../interfaces/user";
import { randomUUID } from 'crypto'

type WhereKey = 'id' | 'email' | 'name'
type WhereValue = string  

export class UsersRepository {

    static database: User[] = []

    static findBy(whereKey: WhereKey, whereValue: WhereValue): User | undefined {
        const user = this.database.find((user) => user[whereKey] == whereValue)
        return user
    }

    static create(user: UserPayload): User{
        const id = randomUUID()

        const userWithId = { ...user, id }
        this.database.push(userWithId)
        
        return userWithId
    }
}