import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'

export function CheckInRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJWT)

    app.get('/check-ins/history', history)
    app.get('/check-ins/metrics', metrics)

    app.post('/gyms/:gymId/checkIns', create)
    app.patch('/check-ins/:checkInId/validate', {onRequest: [verifyUserRole('ADMIN')]}, validate)
}