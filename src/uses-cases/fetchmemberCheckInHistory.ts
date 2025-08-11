import { CheckIn, Users } from '@prisma/client'
import { CheckInRepository } from '@/repositories/checkInReposiroty'

interface fetchUsersCheckInHistoryUseCaseRequest{
    userId: string
    page: number
}

interface fetchUsersCheckInHistoryUseCaseResponse{
    checkIns: CheckIn[]
}

export class fetchUsersCheckInHistoryUseCase {
    constructor(private checkInRepository: CheckInRepository,
    ){}

    

    async execute({
        userId,
        page
    }: fetchUsersCheckInHistoryUseCaseRequest):Promise <fetchUsersCheckInHistoryUseCaseResponse>{
        const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

        return {
            checkIns,
        }
    }
}
