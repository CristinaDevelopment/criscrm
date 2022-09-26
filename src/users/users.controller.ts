import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateUser, UpdateUser } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createUser(@Body() input: CreateUser): Promise<User> {
    return await this.usersService.create(input);
  }
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() input: UpdateUser,
  ): Promise<User> {
    return await this.usersService.update(id, input);
  }

  @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.findUserById(id);
  }
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
