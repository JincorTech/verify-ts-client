/**
 * Interface VerifyServiceInterface
 */
interface VerifyService {

  /**
  * @param {VerificationMethod} method
  *
  * @return {VerificationDetails}
  */
  initiate(method: VerificationMethod): VerificationDetails;

  /**
  * @param {ValidationData} data
  *
  * @return {VerificationResult}
  */
  validate(data: ValidationData): VerificationResult;

  /**
   * @param {InvalidationData} data
   *
   * @return {bool}
   */
  invalidate(data: InvalidationData): boolean;

  /**
  * @param {string} verificationId
  * @param {string} methodType
  *
  * @return VerificationDetails
  */
  getVerification(verificationId: string, methodType: string): VerificationDetails;
}