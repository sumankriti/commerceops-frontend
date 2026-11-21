// ADD THIS — Supported logging levels
export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

// ADD THIS — Structured logging event
export interface LogEvent {
  timestamp: string;
  level: LogLevel;
  application: string;
  feature: string;
  message: string;
  error?: {
    name: string;
    message: string;
  };
}

// ADD THIS — Configurable logging
export interface LoggerConfig {
  application: string;
  minimumLevel: LogLevel;
}

// ADD THIS — Transport abstraction
export interface LogTransport {
  write(event: LogEvent): void;
}

