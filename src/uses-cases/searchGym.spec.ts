import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { SearchGymUseCase } from './searchGym'



let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('fetch check in history Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymUseCase(gymsRepository)
    })

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'selfit',
            description: null,
            phone: null,
            latitude: -3.7319089,
            longitude: -38.5120449
        })

        await gymsRepository.create({
            title: 'smartfit',
            description: null,
            phone: null,
            latitude: -3.7319089,
            longitude: -38.5120449
        })

        const { gyms } = await sut.execute({
            query: 'selfit',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'selfit' }),

        ])
    })

})