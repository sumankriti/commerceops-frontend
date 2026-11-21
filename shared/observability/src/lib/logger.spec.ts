import { Logger } from './logger';
import type { LogEvent, LogTransport } from './logger.types';

describe('CommerceOps Logger', () => {
  let events: LogEvent[];
  let transport: LogTransport;
  let logger: Logger;

  beforeEach(() => {
    events = [];

    // ADD THIS — In-memory transport for testing
    transport = {
      write: (event) => events.push(event),
    };

    logger = new Logger(
      {
        application: 'commerceops-shell',
        minimumLevel: 'INFO',
      },
      [transport],
    );
  });

  it('should create a structured INFO event', () => {
    logger.info('Products', 'Products loaded');

    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      timestamp: expect.any(String),
      level: 'INFO',
      application: 'commerceops-shell',
      feature: 'Products',
      message: 'Products loaded',
    });
  });

  it('should filter logs below the minimum level', () => {
    logger.debug('Products', 'Debug message');

    expect(events).toHaveLength(0);
  });

  it('should normalize Error objects', () => {
    logger.error('Products', 'Remote failed', new Error('Network error'));

    expect(events[0].error).toEqual({
      name: 'Error',
      message: 'Network error',
    });
  });

  it('should dispatch events to multiple transports', () => {
    const secondTransport: LogTransport = {
      write: jest.fn(),
    };

    const multiLogger = new Logger(
      { application: 'commerceops-shell', minimumLevel: 'INFO' },
      [transport, secondTransport],
    );

    multiLogger.warn('Products', 'Slow response');

    expect(events).toHaveLength(1);
    expect(secondTransport.write).toHaveBeenCalledTimes(1);
  });
});