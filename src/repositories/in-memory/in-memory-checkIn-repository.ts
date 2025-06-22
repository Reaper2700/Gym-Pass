import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../checkInReposiroty'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInRepository implements CheckInRepository{
    public items: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput){
        const checkIn = {
            id: randomUUID(),
            users_id: data.users_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        }

        this.items.push(checkIn)

        return checkIn
    }
}
