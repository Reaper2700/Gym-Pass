import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
    const user = await prisma.users.create({
        data: {
            name: 'rafael',
            email: 'rafaell_b@hotmail.com',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
    })

    const response = await request(app.server).post('/sessions').send({
        email: 'rafaell_b@hotmail.com',
        password: '123456'
    })

    const { token } = response.body

    return {token}
}