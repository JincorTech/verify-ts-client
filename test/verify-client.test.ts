import nock from 'nock';
import { VerifyClient } from '../src/client/verify-client';
import { initiate_200, validate_200 } from './responses/verify-responses';
import { email_initiate, google_auth_initiate } from './requests/verify-requests';
import EmailInitiateData from '../src/requests/initiate/email-initiate-data';
import GoogleAuthInitiateData from '../src/requests/initiate/google-auth-initiate-data';
import { VerificationTypes } from '../src/requests/initiate/initiate-data';

/**
 * Verify client test
 */
describe('Verify client test', () => {
  const client = new VerifyClient('http://verify:3000', 'jwt_token');
  const nockInstance = nock('http://verify:3000');

  it('VerifyClient is instantiable', () => {
    expect(client).toBeInstanceOf(VerifyClient);
  });

  it('VerifyClient.initiateVerification email success', () => {
    nockInstance
      .post('/methods/email/actions/initiate', body => {
        expect(body).toEqual(email_initiate);
        return true;
      })
      .reply(200, initiate_200);

    return client
      .initiateVerification(
        new EmailInitiateData('Consumer', {
          body: 'email_body',
          fromEmail: 'mail@mail.ru',
          subject: 'verify_email'
        })
      )
      .then(response => {
        expect(response).toEqual({ ...initiate_200, method: 'email' });
      });
  });

  it('VerifyClient.initiateVerification google auth success', () => {
    nockInstance
      .post('/methods/google_auth/actions/initiate', body => {
        expect(body).toEqual(google_auth_initiate);
        return true;
      })
      .reply(200, initiate_200);

    return client
      .initiateVerification(new GoogleAuthInitiateData('Consumer', 'Issuer'))
      .then(response => {
        expect(response).toEqual({ ...initiate_200, method: 'google_auth' });
      });
  });

  it('VerifyClient.validateVerification success', () => {
    nockInstance
      .post(
        '/methods/email/verifiers/dc910ae0-7c67-4ace-8ebb-9edd4b5d8b0f/actions/validate',
        body => {
          expect(body).toEqual({ code: '123456' });
          return true;
        }
      )
      .reply(200, validate_200);

    return client
      .validateVerification(
        VerificationTypes.EmailVerification,
        'dc910ae0-7c67-4ace-8ebb-9edd4b5d8b0f',
        { code: '123456' }
      )
      .then(response => {
        expect(response).toEqual({ ...validate_200 });
      });
  });

  it('VerifyClient.invalidateVerification success', () => {
    nockInstance
      .delete('/methods/email/verifiers/dc910ae0-7c67-4ace-8ebb-9edd4b5d8b0f')
      .reply(200, { status: 200 });

    return client
      .invalidateVerification(
        VerificationTypes.EmailVerification,
        'dc910ae0-7c67-4ace-8ebb-9edd4b5d8b0f'
      )
      .then(response => {
        expect(response).toEqual({ status: 200 });
      });
  });
});
