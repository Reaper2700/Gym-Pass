import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate'

describe('Create Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able to create a gym', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const response = await request(app.server).post('/gyms/create').set('Authorization', `Bearer ${token}`).send({
            title: 'selfit',
            description: 'rua x numero y',
            phone: '08591974423',
            latitude: '3.5120449',
            longitude: '-38.5120449'
        })

        expect(response.statusCode).toEqual(201)
    })

})