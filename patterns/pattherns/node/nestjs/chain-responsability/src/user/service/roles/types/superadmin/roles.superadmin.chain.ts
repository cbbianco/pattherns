import { RolesChainInterface } from '../../roles.chain.interface';
import { RolesEnum } from '../../../../dto/roles/roles.enum';
import { UserDto } from '../../../../dto/user.dto';
import { User } from '../../../../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../../repository/user.repository';

@Injectable()
export class RolesSuperadminChain implements RolesChainInterface {
  private nextHandler: RolesChainInterface | null = null;

  constructor(private repository: UserRepository) {}
  /**
   * @method handlerRole
   * @description Eslabon SUPERADMIN
   * @param type
   * @param request
   */
  async handlerRole(
    type: RolesEnum | undefined,
    request: UserDto,
  ): Promise<User | undefined> {
    if (type === RolesEnum.SUPERADMIN) {
      const user = new User();
      user.email = request.email;
      user.contextoAuditoria = JSON.stringify({
        chain: 'RolesSuperadminChain',
        date: new Date().toISOString(),
      });
      return this.repository.saveUser(user);
    }

    return this.nextHandler?.handlerRole(type, request);
  }

  /**
   * @method nextRole
   * @description Avanza hacía el siguiente eslabón
   */
  nextRole(nextHandler: RolesChainInterface | null): void {
    this.nextHandler = nextHandler;
  }

  /**
   * @method position
   * @description Posición del eslabón.
   */
  position(): number {
    return 2;
  }
}
