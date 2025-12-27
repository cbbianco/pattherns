import { UserDto } from '../../dto/user.dto';
import { RolesEnum } from '../../dto/roles/roles.enum';
import { User } from '../../entity/user.entity';

export interface RolesChainInterface {
  nextRole(nextHandler: RolesChainInterface | null): void;
  handlerRole(
    type: RolesEnum | undefined,
    request: UserDto,
  ): Promise<User | undefined>;
  position(): number;
}
