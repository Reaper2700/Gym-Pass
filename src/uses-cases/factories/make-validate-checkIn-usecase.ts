import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkIn-repository'
import { ValidateCheckinUseCase } from '../validateCheckIn'

export function makeValidateCheckInUseCase(){
    const checkInRepository = new PrismaCheckInsRepository()
    const useCase = new ValidateCheckinUseCase(checkInRepository)
    
    return useCase
}