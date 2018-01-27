import nock from 'nock';
import { VerifyClient } from '../src/client/verify-client';
import { initiate_200 } from './responses/verify-responses';
import EmailInitiateData from '../src/requests/initiate/email-initiate-data';

/**
 * Dummy test
 */
describe('Dummy test', () => {
  const client = new VerifyClient('http://verify:3000', 'jwt_token');

  beforeEach(() => {
    nock('http://verify:3000')
      .post('/methods/email/actions/initiate')
      .reply(200, initiate_200);
  });

  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('VerifyClient is instantiable', () => {
    expect(client).toBeInstanceOf(VerifyClient);
  });

  it('VerifyClient.initiate email success', () => {
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
});
