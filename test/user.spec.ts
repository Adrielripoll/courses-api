import request from 'supertest'
import bcrypt from 'bcryptjs'
import { app } from '../src/routes'
import { User } from '../src/interfaces/user'
import { UsersRepository } from '../src/repositories/users'
import { expectTypeOf } from 'expect-type'

describe('User', () => {

    const userPayload = {
        name: 'user',
        email: 'user@outlook.com',
        password: '12345678',
        passwordConfirm: '12345678'
    }

    describe('POST /register', () => {
        it('should be able to create a new user', async () => {
            const response = await request(app).post('/register').send(userPayload)
    
            expect(response.status).toBe(201)
            expectTypeOf(response.body).toMatchTypeOf<User>()
        })
    
        it('should return 409 when user already exists', async () => {
            UsersRepository.create(userPayload)
            
            const response = await request(app).post('/register').send(userPayload)
    
            expect(response.status).toBe(409)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('User already exists')
        })
    
        it('should return 422 when provided data is invalid', async () => {
            const invalidUserPayload = {
                name: 'usr',
                email: 'useroutlook.com',
                password: '1234567',
                passwordConfirm: '1234567'
            }
    
            const response = await request(app).post('/register').send(invalidUserPayload)
            
            expect(response.status).toBe(422)
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toBe('string')
        })
    })

    describe('POST /login', () => {

        beforeAll(async () => {
            const hashedPassword = await bcrypt.hash(userPayload.password, 10)

            UsersRepository.create({
                email: userPayload.email,
                name: userPayload.name,
                password: hashedPassword
            })
        })

        it('should be able to sign in user', async () => {
            const loginPayload = {
                email: userPayload.email,
                password: userPayload.password
            }

            const response = await request(app).post('/login').send(loginPayload)
            
            expect(response.status).toBe(200)
        })

        it('should return 400 when credentials are invalid', async () => {
            const invalidCredentialsPayload = {
                email: "invalid@email.com.br",
                password: 'invalidPassword'
            }

            const response = await request(app).post('/login').send(invalidCredentialsPayload)
            
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe("Invalid credentials")
        })
    })
})
