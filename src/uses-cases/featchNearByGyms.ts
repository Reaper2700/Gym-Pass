import { GymsRepository } from '@/repositories/gymRepository'
import { CheckIn, Gym, Users } from '@prisma/client'


interface featchNearByGymsUseCaseRequest{
    UserLatitude: number
    UserLongitude: number
}

interface featchNearByGymsUseCaseResponse{
    gyms: Gym[]
}

export class featchNearByGymsUseCase {
    constructor(private gymRepository: GymsRepository,
    ){}

    

    async execute({
        UserLatitude,
        UserLongitude
    }: featchNearByGymsUseCaseRequest):Promise <featchNearByGymsUseCaseResponse>{
        const gyms = await this.gymRepository.findManyNearBy({latitude: UserLatitude, longitude: UserLongitude})

        return {
            gyms,
        }
    }
}
