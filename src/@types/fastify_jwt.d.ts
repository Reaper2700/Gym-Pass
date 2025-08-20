import '@fastify/jwt'

declare module '@fastify/jwt' {
    interface FastifyJWT {
        //        payload: { id: number}

        payload: {
            role: 'ADMIN | MEMBER'
        }

        user: {

            sub: string,

        }
    }
}