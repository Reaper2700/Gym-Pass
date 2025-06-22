import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Users } from '@prisma/client'
import { ResouceNotFoundError } from './erros/resouces-not-found'

interface GetUserProfileUseCaseRequest{
    userId: string
}

interface GetUserProfileUseCaseResponse{
    user: Users
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({userId}: GetUserProfileUseCaseRequest):Promise <GetUserProfileUseCaseResponse>{
        const user = await this.usersRepository.findById(userId)

        if(!user){
            throw new ResouceNotFoundError
        }

        return {
            user
        }
    }
}
