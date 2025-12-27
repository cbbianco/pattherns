import { Injectable } from '@nestjs/common';
import { RolesChainInterface } from './roles.chain.interface';
import { UserDto } from '../../dto/user.dto';
import { RolesEnum } from '../../dto/roles/roles.enum';
import { User } from '../../entity/user.entity';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class RolesManager {
  private headHandler: RolesChainInterface | null = null;

  private HandlerRegistry: { new (): RolesChainInterface }[] = [];

  constructor(private readonly moduleRef: ModuleRef) {}

  /**
   * @method initiateChain
   * @description Inicializa la cadena de responsabilidad
   * @private
   */
  public async initiateChain(): Promise<void> {
    const handlers: Array<RolesChainInterface> = [];

    for (const HandlerClass of this.HandlerRegistry) {
      const handlerInstance = await this.moduleRef.resolve(HandlerClass);
      handlers.push(handlerInstance);
    }

    if (handlers.length === 0) return;

    const sortedHandlers: Array<RolesChainInterface> = [...handlers].sort(
      (a, b) => a.position() - b.position(),
    );

    this.headHandler = sortedHandlers[0];
    let current = this.headHandler;

    for (let i = 1; i < sortedHandlers.length; i++) {
      current.nextRole(sortedHandlers[i]);
      current = sortedHandlers[i];
    }
  }

  /**
   * @method registerChain
   * @description Se registran los eslabones
   * @param handlerClass
   */
  public registerChain(handlerClass: {
    new (...args: Array<any>): RolesChainInterface;
  }): void {
    this.HandlerRegistry.push(handlerClass);
  }

  /**
   * @method executeChain
   * @description Ejecuta la cadena de responsabilidad
   * @param type
   * @param request
   */

  public async executeChain(
    type: RolesEnum | undefined,
    request: UserDto,
  ): Promise<User | undefined> {
    if (!this.headHandler) {
      return undefined;
    }

    return this.headHandler.handlerRole(type, request);
  }
}
