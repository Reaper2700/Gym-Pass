import { describe, it, expect, beforeEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIn-repository'
import { ValidateCheckinUseCase } from './validateCheckIn'
import { ResouceNotFoundError } from './erros/resouces-not-found'
import { afterEach } from 'node:test'

let CheckInRepository: InMemoryCheckInRepository
let sut: ValidateCheckinUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        CheckInRepository = new InMemoryCheckInRepository()
        sut= new ValidateCheckinUseCase(CheckInRepository)

        vi.useFakeTimers()
    })
    
    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to create CheckIn', async () => {
        const createCheckIn = await CheckInRepository.create({
            gym_id: 'gym-01',
            users_id: 'user-01'
        })
        
        const { checkIn } = await sut.execute({
            checkInId: createCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(CheckInRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('should be able to create CheckIn', async () => {
        expect(() =>  sut.execute({
            checkInId: 'inexist-checkIn'
        })).rejects.toBeInstanceOf(ResouceNotFoundError)
    })

    it('should not be able to validade to chackIn 20 minutes after your creation', async () => {
        vi.setSystemTime(new Date(2023,0,1, 13, 40))

        const createCheckIn = await CheckInRepository.create({
            gym_id: 'gym-01',
            users_id: 'user-01'
        })
        
         vi.advanceTimersByTime(1000 * 60 * 21)
        
        await expect(() => sut.execute({
            checkInId: createCheckIn.id
        })).rejects.toBeInstanceOf(Error)


    })
})