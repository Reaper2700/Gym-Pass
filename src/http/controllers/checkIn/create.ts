import {FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/uses-cases/factories/make-checkIn-usecase'

export async function create (request:FastifyRequest, reply:FastifyReply) {
    const createCheckInParams = z.object({
        gymId: z.string().uuid()
    })
    
    const createCheckInBodySchema = z.object({
        userLatitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        userLongitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const { gymId } = createCheckInParams.parse(request.params)
    const { userLatitude, userLongitude} = createCheckInBodySchema.parse(request.body)

        const createCheckInUseCase = makeCheckInUseCase()

        const response = await createCheckInUseCase.execute({
            gymId,
            userId: request.user.sub,
            userLatitude,
            userLongitude
        })

        

    return reply.status(201).send( response.checkIn )
}