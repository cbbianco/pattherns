import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ExceptionGlobal implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    const resContent = exception.getResponse() as {
      message?: string;
      errors?: any[];
    };

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: resContent.message || exception.message || 'Error inesperado',
      details: resContent.errors || null,
    });
  }
}
