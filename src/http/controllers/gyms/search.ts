import {FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistError } from '@/uses-cases/erros/user-already-exist-error'
import { CreateGymUseCase } from '@/uses-cases/createGym'
import { makeCreateGymUseCase } from '@/uses-cases/factories/make-create-Gym-usecase'
import { makeSearchGymUseCase } from '@/uses-cases/factories/make-search-gym-usecase'

export async function search (request:FastifyRequest, reply:FastifyReply) {
    const searchGymsQueryParams = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { q, page} = searchGymsQueryParams.parse(request.query)

        const searchGymUseCase = makeSearchGymUseCase()

        const gyms = await searchGymUseCase.execute({
            query: q,
            page
        })

    return reply.status(200).send({
        gyms
    })
}