import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
    await request(app.server).post('/users').send({
        name: 'Rafael Pereira',
        email: 'rafaell_b@hotmail.com',
        password: '123456'
    })

    const response = await request(app.server).post('/sessions').send({
        email: 'rafaell_b@hotmail.com',
        password: '123456'
    })

    const { token } = response.body

    return {token}
}