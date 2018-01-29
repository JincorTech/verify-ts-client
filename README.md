# Verify typescript client

Typescript client for interaction with Verify service.

### Usage

```
const client = new VerifyClient('http://verify:3000', 'jwt_token');

// Initiate verification
client.initiateVerification(
  new EmailInitiateData('Consumer', {
    body: 'email_body',
    fromEmail: 'mail@mail.ru',
    subject: 'verify_email'
  })
)
.then(response => {
  // handle response here
});

// Validate verification
client.validateVerification(
  VerificationTypes.EmailVerification,
  'dc910ae0-7c67-4ace-8ebb-9edd4b5d8b0f',
  { code: '123456' }
)
.then(response => {
  // handle response here
});

// Invalidate verification
client.invalidateVerification(
  VerificationTypes.EmailVerification,
  'dc910ae0-7c67-4ace-8ebb-9edd4b5d8b0f'
)
.then(response => {
  // handle response here
});

// Get verification
client.getVerification(VerificationTypes.EmailVerification, 'dc910ae0-7c67-4ace-8ebb-9edd4b5d8b0f')
.then(response => {
  expect(response).toEqual(Verification);
});
```