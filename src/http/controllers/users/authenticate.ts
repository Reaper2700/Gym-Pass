import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/uses-cases/erros/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/uses-cases/factories/make-authenticate-use-cade'
import { sign } from 'crypto'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        const { user } = await authenticateUseCase.execute({
            email,
            password
        })

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: user.id,
                expiresIn: '7d',
            }
        })

        return reply.setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true, //encriptado
            sameSite: true,
            httpOnly: true  //só pode ser acessado pelo backend da aplicação
        }).status(200).send({
            token
        })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }

    
}