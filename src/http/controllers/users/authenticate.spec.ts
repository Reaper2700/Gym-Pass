import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
            const response = await request(app.server).post('/users').send({
                name: 'Rafael Pereira',
                email: 'rafaell_b@hotmail.com',
                password: '123456'
            })
    
            expect(response.statusCode).toEqual(201)
        })  


    it('should be able to authenticate User', async () => {
        const response = await request(app.server).post('/sessions').send({
            email: 'rafaell_b@hotmail.com',
            password: '123456'
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })

})