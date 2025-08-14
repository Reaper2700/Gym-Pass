import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkIn-repository'
import { checkinUseCase } from '../checkinUseCase'

export function makeCheckInUseCase(){
    const checkInRepository = new PrismaCheckInsRepository()
    const gymRepository = new PrismaGymsRepository
    const useCase = new checkinUseCase(checkInRepository, gymRepository)
    
    return useCase
}