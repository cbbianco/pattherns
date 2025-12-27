import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserRepositoryInterface } from './user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private readonly processesRepository: Repository<User>,
  ) {}

  /**
   * @method saveUser
   * @description Persiste un Usuario
   * @param user
   */
  async saveUser(user: User): Promise<User> {
    return this.processesRepository.save(user);
  }
}
