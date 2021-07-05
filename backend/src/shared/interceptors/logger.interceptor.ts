import {
  Inject,
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Logger } from 'winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServerResponse, IncomingMessage } from 'http';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject('winston')
    private readonly _logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const start = Date.now();
    const http = context.switchToHttp();

    const request: IncomingMessage = http.getRequest();
    const response: ServerResponse = http.getResponse();

    return next.handle().pipe(
      tap(() => {
        const end = Date.now();
        const metadata = {
          time: `${end - start} ms`,
          host: request.headers.host,
          timestamp: start.toString(),
          origin: request.headers.origin,
          referer: request.headers.referer,
          'user-agent': request.headers['user-agent'],
        };
        this._logger.info(
          `request: ${request.method} ${request.url} response: ${response.statusCode}`,
          { metadata },
        );
      }),
    );
  }
}
