import { Gym, Prisma } from '@prisma/client'
import { GymsRepository, NearByParams } from '../gymRepository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
    async findById(id: string): Promise<Gym | null> {
        const gym = await prisma.gym.findUnique({
            where: {
                id
            }
        })

        return gym
    }
    async findManyNearBy(params: NearByParams): Promise<Gym[]> {
        throw new Error('Method not implemented.')
    }
    async searchManyByTitle(query: string, page: number): Promise<Gym[]> {
        const gym = await prisma.gym.findMany({
            where: {
                title: { contains: query}
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return gym
    }
    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = await prisma.gym.create({
            data
        })

        return gym
    }

}