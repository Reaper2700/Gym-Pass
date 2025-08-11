import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './createGym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository()
        sut= new CreateGymUseCase(gymRepository)
    })
    
    it('should be able to create gym', async () => {
        const { gym } = await sut.execute({
            title: 'teste',
            description: null,
            phone: null,
            latitude: -3.7319089,
            longitude: -38.5120449
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})