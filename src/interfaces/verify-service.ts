import VerificationMethod from '../verification-method/verification-method';
import ValidationData from '../validation-data/validation-data';
import VerificationDetails from '../verification-details/verification-details';

/**
 * Interface VerifyServiceInterface
 */
export default interface VerifyService {

  /**
  * @param {VerificationMethod} method
  *
  * @return {VerificationDetails}
  */
  initiate(method: VerificationMethod): Promise<VerificationDetails>;

  /**
  * @param {ValidationData} data
  *
  * @return {VerificationResult}
  */
  validate(data: ValidationData): Promise<VerificationResult>;

  /**
   * @param {InvalidationData} data
   *
   * @return {bool}
   */
  invalidate(data: InvalidationData): Promise<boolean>;

  /**
  * @param {string} verificationId
  * @param {string} methodType
  *
  * @return VerificationDetails
  */
  getVerification(verificationId: string, methodType: string): Promise<VerificationDetails>;
}