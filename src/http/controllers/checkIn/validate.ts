import {FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/uses-cases/factories/make-checkIn-usecase'
import { makeValidateCheckInUseCase } from '@/uses-cases/factories/make-validate-checkIn-usecase'

export async function validate (request:FastifyRequest, reply:FastifyReply) {
    const validteCheckInParams = z.object({
        checkInId: z.string().uuid()
    })
    

    const { checkInId } = validteCheckInParams.parse(request.params)
        const validteCheckInUseCase = makeValidateCheckInUseCase()

        await validteCheckInUseCase.execute({
            checkInId
        })

    return reply.status(204).send()
}