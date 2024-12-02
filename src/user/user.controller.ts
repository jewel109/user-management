import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { IResponse } from 'src/success.interceptor';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get('users')
  async getUsers(): Promise<IResponse<User[]>> {
    const users = await this.userService.findAll()
    // console.log(users)
    if (users.length === 0) {
      throw new NotFoundException("No user found")
    }
    return { data: users }
  }

  @Post('addUser')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<IResponse<User>> {
    const data = await this.userService.createUser(createUserDto)
    // console.log(data)

    return { data }
  }
}
