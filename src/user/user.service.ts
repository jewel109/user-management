import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { create } from 'domain';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>

  ) { }

  findAll(): Promise<User[]> {

    return this.userRepository.find()

  }

  createUser(newUserDto: CreateUserDto): Promise<User> {

    const user = new User()
    user.name = newUserDto.name
    user.email = newUserDto.email
    return this.userRepository.save(user)
  }
}
