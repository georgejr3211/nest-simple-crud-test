import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    try {
      return await this.service.find(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put()
  async save(@Body() body: User) {
    try {
      return await this.service.save(body);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    try {
      return await this.service.destroy(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
