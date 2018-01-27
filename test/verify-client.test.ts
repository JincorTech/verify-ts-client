import nock from 'nock';
import { VerifyClient } from '../src/client/verify-client';
import { initiate_200 } from './responses/verify-responses';
import { email_initiate, google_auth_initiate } from './requests/verify-requests';
import EmailInitiateData from '../src/requests/initiate/email-initiate-data';
import GoogleAuthInitiateData from '../src/requests/initiate/google-auth-initiate-data';

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
});
