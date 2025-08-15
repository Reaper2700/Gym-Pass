import { fetchUsersCheckInHistoryUseCase } from '../fetchmemberCheckInHistory'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkIn-repository'

export function makeFeatchUserCheckInHistoryUseCase(){
    const checkInRepository = new PrismaCheckInsRepository()
    const useCase = new fetchUsersCheckInHistoryUseCase(checkInRepository)
    
    return useCase
}