import { Gym, Prisma } from '@prisma/client'

export interface NearByParams{
    latitude: number, 
    longitude: number
}

export interface GymsRepository{
    findById(id: string): Promise<Gym | null>
    findManyNearBy(params: NearByParams): Promise<Gym[]>
    searchManyByTitle(query: string, page: number): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}
