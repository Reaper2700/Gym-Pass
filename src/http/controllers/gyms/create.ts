import {FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistError } from '@/uses-cases/erros/user-already-exist-error'
import { CreateGymUseCase } from '@/uses-cases/createGym'
import { makeCreateGymUseCase } from '@/uses-cases/factories/make-create-Gym-usecase'

interface CreteGymUseCaseRequest{
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}


export async function create (request:FastifyRequest, reply:FastifyReply) {
    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
        
    })

    const {title, description, phone, latitude, longitude} = createGymBodySchema.parse(request.body)

        const createGymUseCase = makeCreateGymUseCase()

        await createGymUseCase.execute({
            title,
            description,
            phone,
            latitude,
            longitude
        })

    return reply.status(201).send()
}