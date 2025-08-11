import { CheckIn, Users } from '@prisma/client'
import { CheckInRepository } from '@/repositories/checkInReposiroty'
import { error } from 'console'
import { GymsRepository } from '@/repositories/gymRepository'
import { ResouceNotFoundError } from './erros/resouces-not-found'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance'
import { MaxDistanceError } from './erros/max-distance-error'
import { MaxNumberCheckInsError } from './erros/max-number-of-checkin-error'

interface checkinUseCaseRequest{
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface checkinUseCaseResponse{
    checkIn: CheckIn
}

export class checkinUseCase {
    constructor(private checkInRepository: CheckInRepository,
        private gymsRepository: GymsRepository
    ){}

    

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude
    }: checkinUseCaseRequest):Promise <checkinUseCaseResponse>{
        const gym = await this.gymsRepository.findById(gymId)

        if(!gym){
            throw new ResouceNotFoundError()
        }
        
        const distance = getDistanceBetweenCoordinates({
            latitude: userLatitude, longitude: userLongitude},
        {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()})
        
        const max_distance = 0.1

        if(distance > max_distance){
            throw new MaxDistanceError()
        }

        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
            userId,
            new Date()
        )
        
        
        if(checkInOnSameDay){
            throw new MaxNumberCheckInsError()
        }
        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            users_id: userId
        })

        return {
            checkIn
        }
    }
}
