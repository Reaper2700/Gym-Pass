import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIn-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { fetchUsersCheckInHistoryUseCase } from './fetchmemberCheckInHistory'



let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: fetchUsersCheckInHistoryUseCase

describe('fetch check in history Use Case', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new fetchUsersCheckInHistoryUseCase(checkInRepository)
    })

    it.skip('should be able to fetch checkIn history', async () => {
        await checkInRepository.create({
            gym_id: 'gym-01',
            users_id: 'user-01'
        })

         await checkInRepository.create({
            gym_id: 'gym-02',
            users_id: 'user-01'
        })
        
        const { checkIns } = await sut.execute({
            userId: 'user-01'
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01'}),
            expect.objectContaining({ gym_id: 'gym-02'})
        ])
    })

})