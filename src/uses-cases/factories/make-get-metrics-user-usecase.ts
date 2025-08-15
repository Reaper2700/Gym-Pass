import { getUsermetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkIn-repository'

export function makeGetUserMetricsUseCase(){
    const checkInRepository = new PrismaCheckInsRepository()
    const useCase = new getUsermetricsUseCase(checkInRepository)
    
    return useCase
}