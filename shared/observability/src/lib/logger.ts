import {
    LogEvent,
    LogLevel,
    LoggerConfig,
    LogTransport,
  } from './logger.types';
  
  // ADD THIS — Severity ordering
  const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
    DEBUG: 10,
    INFO: 20,
    WARN: 30,
    ERROR: 40,
  };
  
  export class Logger {
    constructor(
      private readonly config: LoggerConfig,
      private readonly transports: LogTransport[],
    ) {}
  
    debug(feature: string, message: string): void {
      this.log('DEBUG', feature, message);
    }
  
    info(feature: string, message: string): void {
      this.log('INFO', feature, message);
    }
  
    warn(feature: string, message: string): void {
      this.log('WARN', feature, message);
    }
  
    error(feature: string, message: string, error?: unknown): void {
      this.log('ERROR', feature, message, error);
    }
  
    private log(
      level: LogLevel,
      feature: string,
      message: string,
      error?: unknown,
    ): void {
      // ADD THIS — Filter events below configured severity
      if (
        LOG_LEVEL_PRIORITY[level] <
        LOG_LEVEL_PRIORITY[this.config.minimumLevel]
      ) {
        return;
      }
  
      // ADD THIS — Create structured event
      const event: LogEvent = {
        timestamp: new Date().toISOString(),
        level,
        application: this.config.application,
        feature,
        message,
      };
  
      // ADD THIS — Normalize error information
      if (error !== undefined) {
        event.error =
          error instanceof Error
            ? { name: error.name, message: error.message }
            : { name: 'UnknownError', message: String(error) };
      }
  
      // ADD THIS — Dispatch to configured transports
      for (const transport of this.transports) {
        transport.write(event);
      }
    }
  }