import { test, describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistError } from './erros/user-already-exist-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut= new RegisterUseCase(usersRepository)
    })
    
    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'teste',
            email: 'teste1@hotmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon register', async () => {
        const { user } = await sut.execute({
            name: 'teste',
            email: 'teste1@hotmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

        await expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with exist email', async () => {
        const email = 'teste1@hotmail.com'

        await sut.execute({
            name: 'teste',
            email,
            password: '123456'
        })

        await expect(
            sut.execute({
                name: 'teste',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistError)
    })
})