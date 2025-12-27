import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { RolesManager } from './roles/roles.manager';
import { RolesAdminChain } from './roles/types/admin/roles.admin.chain';
import { RolesSuperadminChain } from './roles/types/superadmin/roles.superadmin.chain';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private rolesManager: RolesManager) {
    this.rolesManager.registerChain(RolesAdminChain);
    this.rolesManager.registerChain(RolesSuperadminChain);
  }

  async onModuleInit(): Promise<any> {
    await this.rolesManager.initiateChain();
  }

  /**
   * @method saveUser
   * @description Persiste un Usuario
   * @param user
   */
  async saveUser(user: UserDto): Promise<User | undefined> {
    return this.rolesManager.executeChain(user.levelRol, user);
  }
}
