import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { featchNearByGymsUseCase } from './featchNearByGyms'



let gymsRepository: InMemoryGymsRepository
let sut: featchNearByGymsUseCase

describe('fetch check in history Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new featchNearByGymsUseCase(gymsRepository)
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

        await gymsRepository.create({
            title: 'Farfit',
            description: null,
            phone: null,
            latitude: -30.7319089,
            longitude: -8.5120449
        })

        const { gyms } = await sut.execute({
            UserLatitude: -3.7319089,
            UserLongitude: -38.5120449
        })

        expect(gyms).toHaveLength(2)
    })

})