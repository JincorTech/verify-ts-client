// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

import * as WebRequest from 'web-request';
import VerifyService from './interfaces/verify-service';
import VerificationMethod from './verification-method/verification-method';
import VerificationDetailsCreator from './verification-details/verification-details-creator';
import VerificationDetails from './verification-details/verification-details';
import ValidationData from './validation-data/validation-data';

/**
 * Class VerifyClient
 */
export default class VerifyClient implements VerifyService {
  constructor(jwtToken: string) {
    WebRequest.defaults({
      throwResponseError: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
        'Accept': 'application/vnd.jincor+json; version=1'
      }
    });
  }
  
  /**
     * Initiate verification process
     *
     * @param {VerificationMethod} method Verification Method
     *
     * @return {VerificationDetails}
     *
     * @throws {Error}
     */
  public async initiate(method: VerificationMethod): Promise<VerificationDetails> {
    const response = await WebRequest.post(
      `/methods/${method.getMethodType()}/actions/initiate`,
      method.getRequestParameters()
    )

    return VerificationDetailsCreator.create(method.getMethodType(), response.content);
  }

  /**
   * Validate the code
   *
   * @param {ValidationData} data Validation Data
   *
   * @return {VerificationResult}
   *
   * @throws {Error}
   */
  public async validate(data: ValidationData): Promise<VerificationResult> {
    try {
      const response = await WebRequest.post(
        `/methods/${data.getMethodType()}/verifiers/${data.getVerificationId()}/actions/validate`,
        data.getRequestParameters()
      )

      return VerificationResult.fromJson(response.content);
    } catch (exception) {
      if (exception.statusCode === 422) {
        throw new Error('Invalid Code');
      }

      throw exception;
    }
  }

  /**
   * Invalidate the code
   *
   * @param {InvalidationData} data Invalidation Data
   *
   * @return {boolean}
   */
  public async invalidate(data: InvalidationData): Promise<boolean> {
    const response = await WebRequest.delete(
      `/methods/${data.getMethodType()}/verifiers/${data.getVerificationId()}`
    );

    return true;
  }

  /**
   * @param {string} verificationId
   * @param {string} methodType
   *
   * @return {VerificationDetails}
   */
  public async getVerification(verificationId: string, methodType: string): Promise<VerificationDetails> {
    const response = await WebRequest.get(
      `/methods/${methodType}/verifiers/${verificationId}`
    )

    return VerificationDetailsCreator.create(methodType, response.content);
  }
}
