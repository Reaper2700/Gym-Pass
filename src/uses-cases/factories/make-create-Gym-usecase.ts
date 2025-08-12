import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../createGym'

export function makeCreateGymUseCase(){
    const gymRepository = new PrismaGymsRepository
    const useCase = new CreateGymUseCase(gymRepository)
    
    return useCase
}