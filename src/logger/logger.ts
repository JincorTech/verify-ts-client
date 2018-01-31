import winston from 'winston';

winston.configure({
  level: 'warn',
  transports: [new winston.transports.Console()]
});

export default winston;
