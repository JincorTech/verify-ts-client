export const email_initiate = {
  method: 'email',
  consumer: 'Consumer',
  template: {
    body: 'email_body',
    fromEmail: 'mail@mail.ru',
    subject: 'verify_email'
  },
  generateCode: {
    length: 6,
    symbolSet: ['DIGITS']
  },
  policy: {
    expiredOn: '01:00:00'
  }
};

export const google_auth_initiate = {
  method: 'google_auth',
  consumer: 'Consumer',
  issuer: 'Issuer',
  generateCode: {
    length: 6,
    symbolSet: ['DIGITS']
  },
  policy: {
    expiredOn: '01:00:00'
  }
};
