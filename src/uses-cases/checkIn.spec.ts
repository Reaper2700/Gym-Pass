import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIn-repository'
import { checkinUseCase } from './checkinUseCase'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberCheckInsError } from './erros/max-number-of-checkin-error'
import { MaxDistanceError } from './erros/max-distance-error'


let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: checkinUseCase

describe('Register Use Case', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new checkinUseCase(checkInRepository, gymsRepository)



        await gymsRepository.create({
            id: 'gym-01',
            title: 'Selfit',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0,
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check-in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check-in in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })).rejects.toBeInstanceOf(MaxNumberCheckInsError)
    })

    it('should be able to check-in in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })


    it('should not be able to check-in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Selfit',
            description: '',
            phone: '',
            latitude: new Decimal(-3.7319089),
            longitude: new Decimal(-38.5120449),
        })

        await expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -3.7,
            userLongitude: -38.5
        })).rejects.toBeInstanceOf(MaxDistanceError)

    })
})