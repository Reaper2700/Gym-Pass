import { Prisma,Users } from "@prisma/client";

export interface UsersRepository{
    findByEmail(email: string): Promise<Users | null>
    create(data: Prisma.UsersCreateInput): Promise<Users>
}