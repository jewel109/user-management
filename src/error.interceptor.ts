import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = {
      message: 'unhandled error occured',
      timestamp: new Date().toISOString(),
    };

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const response = exception.getResponse();
      const message =
        typeof response === 'object' && response !== null
          ? (response as { message: string }).message
          : 'Unknown error found';
      responseBody.message = message;
    } else if (exception instanceof QueryFailedError) {
      httpStatus = HttpStatus.BAD_REQUEST; // or another appropriate status
      responseBody.message = `Database query failed: ${exception.message}`;
    } else if (exception instanceof EntityNotFoundError) {
      httpStatus = HttpStatus.NOT_FOUND;
      responseBody.message = `Entity not found: ${exception.message}`;
    } else if (exception instanceof Error) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody.message = `just an Error  ${exception.message}`;
    } else if (exception instanceof TypeORMError) {
      httpStatus = HttpStatus.BAD_REQUEST;
      responseBody.message = `error in db : ${exception.message}`;
    } else {
      console.error(exception);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
