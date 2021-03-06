import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserInput } from './user.input';
import { UserType } from './user.type';
import * as bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'
import { JwtService } from '@nestjs/jwt';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        ){}

        async createUser (userInput: UserInput): Promise<UserType> {
            // let {email, username, password }= userInput
            const lowerCaseEmail = userInput.email.toLowerCase()

            const hashedPassword = await  bcrypt.hash(userInput.password, 10)

            const user = this.userRepository.create({
                id: uuid(),
                username: userInput.username,
                email: lowerCaseEmail,
                password: hashedPassword,
                role: "user",
                orders: []
                
            })
            this.userRepository.save(user)

           const {password, ...result} = user
           console.log(result);
           
           return result
        }

         async getUserByEmail(email: string): Promise<UserType> {
            return await this.userRepository.findOne({
                email
            })
        }
         async getUser(id: string): Promise<UserType> {
            return await this.userRepository.findOne({
                id
            })
        }

        async getUsers(): Promise<UserType[]> {
            return await this.userRepository.find()
        }

        async addOrder(userId:string, orderId: string): Promise<UserType> {
            const userOrder = await this.getUser(userId)

            userOrder.orders =[...userOrder.orders, orderId]
            return this.userRepository.save(userOrder)
        }
        
}
