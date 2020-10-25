import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private logger: Logger;

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {
    this.logger = new Logger('UserService');
  }

  async findAll(): Promise<User[]> {
    try {
      const result = await this.repo.createQueryBuilder('user')
        .where('user.status = :status', { status: true })
        .getMany();

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async find(id: string): Promise<User> {
    try {
      const result = await this.repo.findOne({ id });

      if (!result) {
        throw new BadRequestException('Usuário não encontrado');
      }

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const result = await this.repo.findOne({ email });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async save(data: User): Promise<User> {
    try {
      const user = await this.findByEmail(data.email);
      if (user) {
        throw new BadRequestException('E-mail já cadastrado');
      }

      const result = await this.repo.save(data);

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async destroy(id: string): Promise<boolean> {
    try {
      const user = await this.find(id);

      if (user) {
        await this.repo.softDelete(id);
      }

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
