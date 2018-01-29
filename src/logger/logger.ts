import winston from 'winston';

winston.configure({
  level: 'debug',
  transports: [new winston.transports.File({ filename: 'verify-ts-client.log' })]
});

export default winston;
