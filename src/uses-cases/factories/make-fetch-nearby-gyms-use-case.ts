import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { featchNearByGymsUseCase } from '../featchNearByGyms'

export function makefearchNearByGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository
    const useCase = new featchNearByGymsUseCase(gymsRepository)
    
    return useCase
}