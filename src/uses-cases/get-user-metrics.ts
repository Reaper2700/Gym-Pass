import { CheckIn, Users } from '@prisma/client'
import { CheckInRepository } from '@/repositories/checkInReposiroty'

interface getUserMetricsUseCaseRequest{
    userId: string

}

interface getUsermetricsUseCaseResponse{
    checkInsCount: number
}

export class getUsermetricsUseCase {
    constructor(private checkInRepository: CheckInRepository,
    ){}

    

    async execute({
        userId
    }: getUserMetricsUseCaseRequest):Promise <getUsermetricsUseCaseResponse>{
        const checkInsCount = await this.checkInRepository.countByUserId(userId)

        return {
            checkInsCount
        }
    }
}
