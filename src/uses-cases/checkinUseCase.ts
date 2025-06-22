import { CheckIn, Users } from '@prisma/client'
import { CheckInRepository } from '@/repositories/checkInReposiroty'

interface checkinUseCaseRequest{
    userId: string
    gymId: string
}

interface checkinUseCaseResponse{
    checkIn: CheckIn
}

export class checkinUseCase {
    constructor(private checkInRepository: CheckInRepository){}

    async execute({userId, gymId}: checkinUseCaseRequest):Promise <checkinUseCaseResponse>{
        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            users_id: userId
        })

        return {
            checkIn
        }
    }
}
