import {FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFeatchUserCheckInHistoryUseCase } from '@/uses-cases/factories/make-fetch-user-checkIn-history-usecase'

export async function history (request:FastifyRequest, reply:FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkInHistoryQuerySchema.parse(request.query)

        const checkInHistoryUseCase = makeFeatchUserCheckInHistoryUseCase()

        const { checkIns} = await checkInHistoryUseCase.execute({
            userId: request.user.sub,
            page,
        })

    return reply.status(200).send({
        checkIns
    })
}