import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'


export function GymsRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJWT)

    
}