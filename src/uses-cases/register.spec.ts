import { test, describe, it, expect } from "vitest"
import { RegisterUseCase } from "./register"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistError } from "./erros/user-already-exist-error"

describe('Register Use Case', () => {
    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'teste',
            email: 'teste1@hotmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'teste',
            email: 'teste1@hotmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with exist email', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'teste1@hotmail.com'

        await registerUseCase.execute({
            name: 'teste',
            email,
            password: '123456'
        })

        await expect(
            registerUseCase.execute({
                name: 'teste',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistError)
    })
})