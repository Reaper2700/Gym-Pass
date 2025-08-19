import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate'

describe('Search Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able to search a gym', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server).post('/gyms/create').set('Authorization', `Bearer ${token}`).send({
            title: 'selfit',
            description: 'rua x numero y',
            phone: '08591974423',
            latitude: '3.5120449',
            longitude: '-38.5120449'
        })

        await request(app.server).post('/gyms/create').set('Authorization', `Bearer ${token}`).send({
            title: 'smartfit4',
            description: 'rua x numero y',
            phone: '08591974423',
            latitude: '3.5120449',
            longitude: '-38.5120449'
        })

        const response = await request(app.server).get('/gyms/search').query({
            q: 'smartfit4'
        }).set('Authorization', `Bearer ${token}`)


        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: 'smartfit4',
                }),
            ]),
        )   
    })

})