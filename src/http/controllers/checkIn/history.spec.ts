import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate'
import { prisma } from '@/lib/prisma'

describe('get history checkIn (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able to get history a gym', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.users.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: 'selfit',
                latitude: '3.5120449',
                longitude: '-38.5120449'
            }
        })

        const checkIns = await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    users_id: user.id
                },
                {
                    gym_id: gym.id,
                    users_id: user.id
                }
            ]
        })

        const response = await request(app.server).get('/check-ins/history').set('Authorization', `Bearer ${token}`).send()


        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id: gym.id,
                    users_id: user.id
            }),
            expect.objectContaining({
                gym_id: gym.id,
                    users_id: user.id
            })
        ])
    })

})