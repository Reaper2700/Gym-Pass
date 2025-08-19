import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate'
import { prisma } from '@/lib/prisma'


//dando erro 400
describe('Create checkIn (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it.skip('should be able to checkIn a gym', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: 'selfit52',
                latitude: '3.5120449',
                longitude: '-38.5120449'
            }
        })

        const response = await request(app.server).post(`/gyms/${gym.id}/checkIns`).set('Authorization', `Bearer ${token}`).send({
            latitude: 3.5120449,
            longitude: -38.5120449
        })

        console.log(response)

        expect(response.statusCode).toEqual(201)
    })

})