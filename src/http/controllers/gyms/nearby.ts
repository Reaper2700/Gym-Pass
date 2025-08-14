import {FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistError } from '@/uses-cases/erros/user-already-exist-error'
import { CreateGymUseCase } from '@/uses-cases/createGym'
import { makeCreateGymUseCase } from '@/uses-cases/factories/make-create-Gym-usecase'
import { makeSearchGymUseCase } from '@/uses-cases/factories/make-search-gym-usecase'
import { makefearchNearByGymsUseCase } from '@/uses-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby (request:FastifyRequest, reply:FastifyReply) {
    const nearbyQueryParams = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude} = nearbyQueryParams.parse(request.query)

        const searchGymUseCase = makefearchNearByGymsUseCase()

        const gyms = await searchGymUseCase.execute({
            UserLatitude: latitude,
            UserLongitude: longitude
        })

    return reply.status(200).send({
        gyms
    })
}