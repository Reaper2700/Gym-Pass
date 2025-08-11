import { Users, Prisma, Gym } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'
import { GymsRepository, NearByParams } from '../gymRepository'
import { title } from 'process'
import { describe } from 'vitest'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance'

export class InMemoryGymsRepository implements GymsRepository{
    async findManyNearBy(params: NearByParams): Promise<Gym[]> {
        return this.items.filter(item => {
            const distance = getDistanceBetweenCoordinates({
                latitude: params.latitude, longitude:params.longitude},
            { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber()})

            return distance < 10
        })
    }
    async searchManyByTitle(query: string, page: number){
        return this.items.filter(item => item.title.includes(query)).slice((page - 1) * 20, (page * 20))
    }
    public items: Gym[] = []

    async findById(id: string): Promise<Gym | null> {
        const user = this.items.find(item => item.id === id)
        
        if(!user){
            return null
        }

        return user
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date()
        }

        this.items.push(gym)

        return gym
    }
}
