import type { LogEvent, LogTransport } from '../logger.types';

export class ConsoleTransport implements LogTransport {
  write(event: LogEvent): void {
    switch (event.level) {
      case 'DEBUG':
        console.debug(event);
        break;

      case 'INFO':
        console.info(event);
        break;

      case 'WARN':
        console.warn(event);
        break;

      case 'ERROR':
        console.error(event);
        break;
    }
  }
}