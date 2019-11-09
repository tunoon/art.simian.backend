import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const { url, method } = request;

    const exceptionResponse = {
      statusCode: status,
      timestamp: new Date().toLocaleString(),
      path: url,
      method,
      message: exception.message.error || exception.message || null
    };

    Logger.error(
      `${method} ${url}`,
      JSON.stringify(exceptionResponse),
      'HttpExceptionFilter'
    );

    response.status(status).json(exceptionResponse);
  }
}
