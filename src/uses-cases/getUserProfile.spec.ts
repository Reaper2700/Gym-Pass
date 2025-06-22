import { test, describe, it, expect, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { GetUserProfileUseCase } from './get-user-profile'
import { ResouceNotFoundError } from './erros/resouces-not-found'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase


describe('Get user Profile Use Case', () => {
        beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut= new GetUserProfileUseCase(usersRepository)
    })
    
    it('should be able to register', async () => {
        const createdUser = await usersRepository.create({
            name: 'john',
            email: 'teste1@hotmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should not be able to get user Profile with wrong id', async () => {
       expect(() => sut.execute({
            userId: 'non_existing'
        })).rejects.toBeInstanceOf(ResouceNotFoundError)
    })

    
})