import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (exception.code === 'P2025')
      return res.status(404).json({
        statusCode: 404,
        message: exception.message,
      });

    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}
