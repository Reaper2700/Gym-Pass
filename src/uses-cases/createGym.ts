import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { Gym, Users } from '@prisma/client'
import { UserAlreadyExistError } from './erros/user-already-exist-error'
import { GymsRepository } from '@/repositories/gymRepository'


interface CreteGymUseCaseRequest{
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreteGymUseCaseResponse{
    gym: Gym
}

export class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository){}
    
    async execute({
        title,
        description,
        phone,
        latitude,
        longitude
    }: CreteGymUseCaseRequest) : Promise<CreteGymUseCaseResponse>{
    
        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })

        return{
            gym
        }
    }
}
