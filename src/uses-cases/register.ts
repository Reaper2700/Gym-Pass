import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"
import { UsersRepository } from "@/repositories/users-repository"
import { Users } from "@prisma/client"
import { UserAlreadyExistError } from "./erros/user-already-exist-error"


interface RegisterUseCaseRequest{
    name: string,
    email: string,
    password: string
}

interface RegisterUseCaseResponse{
    user: Users
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository){}
    
    async execute({
        name, 
        email, 
        password,
    }: RegisterUseCaseRequest) : Promise<RegisterUseCaseResponse>{

        const password_hash = await hash(password, 6 )
    
        const userWithSameEmail =await this.usersRepository.findByEmail(email)
    
        if(userWithSameEmail){
            throw new UserAlreadyExistError()
        }
    
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })

        return{
            user
        }
    }
}
