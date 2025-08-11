import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIn-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { fetchUsersCheckInHistoryUseCase } from './fetchmemberCheckInHistory'
import { getUsermetricsUseCase } from './get-user-metrics'



let checkInRepository: InMemoryCheckInRepository
let sut: getUsermetricsUseCase

describe('fetch check in history Use Case', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new getUsermetricsUseCase(checkInRepository)
    })

    it('should be able to get check ins count metrics', async () => {
        await checkInRepository.create({
            gym_id: 'gym-01',
            users_id: 'user-01'
        })

         await checkInRepository.create({
            gym_id: 'gym-02',
            users_id: 'user-01'
        })
        
        const { checkInsCount } = await sut.execute({
            userId: 'user-01'
        })

        expect(checkInsCount).toEqual(2)
    })

})