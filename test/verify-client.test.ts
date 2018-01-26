import nock from 'nock';
import { VerifyClient, VerificationTypes } from '../src/client/verify-client';
import { initiate_200 } from './responses/verify-responses';

/**
 * Dummy test
 */
describe('Dummy test', () => {
  const client = new VerifyClient('http://verify:3000', 'jwt_token');

  beforeEach(() => {
    nock('http://verify:3000')
      .get('/methods/email/actions/initiate')
      .reply(200, initiate_200);
  });

  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('VerifyClient is instantiable', () => {
    expect(client).toBeInstanceOf(VerifyClient);
  });

  // it("VerifyClient.initiate success", () => {
  //   client.initiate(VerificationMethod.METHOD_EMAIL)
  // })
});
