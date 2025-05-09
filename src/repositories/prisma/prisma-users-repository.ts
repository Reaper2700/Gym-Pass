import { prisma } from "../../lib/prisma";
import { Prisma, Users} from "@prisma/client"
import { UsersRepository } from "../users-repository";


export class PrismaUsersRepository implements UsersRepository{
    async findByEmail(email: string) {
        const user = await prisma.users.findUnique({
            where: {
                email,
            }
        })

        return user
    }

    async create(data: Prisma.UsersCreateInput){
       const user = await prisma.users.create({
        data,
       })

        return user
    }
}

