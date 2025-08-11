import { CheckIn, Users } from '@prisma/client'
import { CheckInRepository } from '@/repositories/checkInReposiroty'
import { error } from 'console'
import { GymsRepository } from '@/repositories/gymRepository'
import { ResouceNotFoundError } from './erros/resouces-not-found'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance'
import { MaxDistanceError } from './erros/max-distance-error'
import { MaxNumberCheckInsError } from './erros/max-number-of-checkin-error'
import dayjs from 'dayjs'

interface ValidateCheckinUseCaseRequest{
    checkInId: string
}

interface ValidateCheckinUseCaseResponse{
    checkIn: CheckIn
}

export class ValidateCheckinUseCase {
    constructor(private checkInRepository: CheckInRepository
    ){}

    

    async execute({
        checkInId
    }: ValidateCheckinUseCaseRequest):Promise <ValidateCheckinUseCaseResponse>{
        const checkIn = await this.checkInRepository.findById(checkInId)

        if(!checkIn){
            throw new ResouceNotFoundError()
        }
        
        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes')

        if(distanceInMinutesFromCheckInCreation > 20){
            throw new Error()
        }

        checkIn.validated_at = new Date()

        await this.checkInRepository.save(checkIn)

        return {
            checkIn
        }
    }
}
