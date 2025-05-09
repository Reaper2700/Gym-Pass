import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./erros/invalid-credentials-error";
import { compare } from "bcryptjs";
import { Users } from "@prisma/client";

interface AuthenticateUseCaseRequest{
    email: string
    password: string
}

interface AuthenticateUseCaseResponse{
    user: Users
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({email, password}: AuthenticateUseCaseRequest):Promise <AuthenticateUseCaseResponse>{
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialsError
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError
        }

        return {
            user
        }
    }
}
