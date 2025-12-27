import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../../dto/user.dto';
import { UserService } from '../../service/user.service';
import { ResponseDto } from '../../../common/dto/response.dto';
import { User } from '../../entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  /**
   * @method saveUser
   * @description persiste un usuario
   *
   * @param user
   */
  @Post('api/v1')
  async saveUser(
    @Body() user: UserDto,
  ): Promise<ResponseDto<User | undefined>> {
    const response = new ResponseDto<User | undefined>();
    response.succes = true;
    response.message = 'Usuario creado';
    response.data = await this.service.saveUser(user);
    return response;
  }
}
