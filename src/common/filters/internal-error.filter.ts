import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class InternalErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(InternalErrorFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Determine if this is a 500 error
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Only log 500 errors
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.log(exception);
      this.logger.error(
        `Internal Server Error for ${request.method} ${request.url}`,
        {
          error: exception instanceof Error ? exception.stack : exception,
          body: request.body,
          params: request.params,
          query: request.query,
        },
      );
    }

    // Let the request continue its normal flow
    if (exception instanceof HttpException) {
      response.status(status).json(exception.getResponse());
    } else {
      response.status(status).json({
        statusCode: status,
        message: 'Internal server error',
      });
    }
  }
}
