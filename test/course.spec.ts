import { config } from 'dotenv'
import { app } from '../src/routes'
import { ExpectTypeOf, expectTypeOf } from 'expect-type'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import request from 'supertest'
import { Course } from '../src/interfaces/course'

config()

describe('Courses', () => {

    let authToken: string

    beforeAll(async () => {
        authToken = jwt.sign({
            name: 'user',
            email: 'user@outlook.com',
            password: await bcrypt.hash('12345678', 10)
        }, process.env.JWT_SECRET!)
    })

    describe('GET /courses', () => {
        it('should return courses list', async () => {
            const response = await request(app).get('/auth/courses').set('authorization-token', authToken)

            expect(response.status).toBe(200)
            expectTypeOf(response.body).toMatchTypeOf<Course[]>()
        })
    })

    describe('GET /courses/{id}', () => {
        it('should return one courses from list', async () => {
            const response = await request(app).get('/auth/courses/2c0c75c6-0a41-11ee-be56-0242ac120002').set('authorization-token', authToken)

            expect(response.status).toBe(200)
            expectTypeOf(response.body).toMatchTypeOf<Course[]>()
        })

        it('should return 404 when requested item was not found', async () => {
            const response = await request(app).get('/auth/courses/invalid_id').set('authorization-token', authToken)

            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Course not found')
        })
    })
})