import request from 'supertest'
import {app} from '../src/routes'

describe('[GET, POST, PUT, DELETE] /auth/*', () => {
    it('should return 401 when token is not provided', async () => {
        const response = await request(app).get('/auth')
        expect(response.status).toBe(401)
        expect(response.body.message).toBe('Unauthorized')
    })
})