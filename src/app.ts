import fastify from 'fastify'
import { UsersRoutes } from './http/controllers/users/rotes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { GymsRoutes } from './http/controllers/gyms/routes'
import { CheckInRoutes } from './http/controllers/checkIn/routes'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
} )

app.register(UsersRoutes)
app.register(GymsRoutes)
app.register(CheckInRoutes)

app.setErrorHandler((error, request, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({ message: 'validation error', issues: error.format})

    }

    if(env.NODE_ENV != 'production'){
        console.error(error)
    }else{
        
    }

    return reply.status(500).send({message: 'interval server error'})
})