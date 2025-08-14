import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makefearchNearByGymsUseCase } from '@/uses-cases/factories/make-fetch-nearby-gyms-use-case'
import { makeFeatchUserCheckInHistoryUseCase } from '@/uses-cases/factories/make-fetch-user-checkIn-history-usecase'
import { makeGetUserMetricsUseCase } from '@/uses-cases/factories/make-get-metrics-user-usecase'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
    const getUsermetricsUseCase = makeGetUserMetricsUseCase()

    const { checkInsCount } = await getUsermetricsUseCase.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({
        checkInsCount
    })
}