import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user.service';
import { RolesManager } from './service/roles/roles.manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { RolesAdminChain } from './service/roles/types/admin/roles.admin.chain';
import { RolesSuperadminChain } from './service/roles/types/superadmin/roles.superadmin.chain';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    RolesManager,
    UserRepository,
    RolesAdminChain,
    RolesSuperadminChain,
  ],
})
export class UserModule {}
