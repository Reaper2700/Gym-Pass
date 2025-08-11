import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { Gym, Users } from '@prisma/client'
import { UserAlreadyExistError } from './erros/user-already-exist-error'
import { GymsRepository } from '@/repositories/gymRepository'


interface SearchGymUseCaseRequest{
    query: string
    page: number
}

interface SearchGymUseCaseResponse{
    gyms: Gym[]
}

export class SearchGymUseCase {
    constructor(private gymsRepository: GymsRepository){}
    
    async execute({
        query,
        page
    }: SearchGymUseCaseRequest) : Promise<SearchGymUseCaseResponse>{
    
        const gyms = await this.gymsRepository.searchManyByTitle(
            query,
            page
        )

        return{
            gyms
        }
    }
}
