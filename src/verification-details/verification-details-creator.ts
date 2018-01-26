import VerificationMethod from '../verification-method/verification-method';
import VerificationDetails from '../verification-details/verification-details';
import EmailVerificationDetails from '../verification-details/email-verification-details';
import GoogleAuthVerificationDetails from '../verification-details/google-auth-verification-details';

/**
 * Class VerificationDetailsCreator
 */
export default abstract class VerificationDetailsCreator {
  /**
   * @param {string} methodType
   * @param {object} data
   *
   * @return {VerificationDetails}
   *
   * @throws {Error}
   */
  public static create(methodType: string, jsonData: string): VerificationDetails {
    switch (methodType) {
      case VerificationMethod.METHOD_EMAIL:
        return EmailVerificationDetails.fromJson(jsonData);
      case VerificationMethod.METHOD_GOOGLE_AUTH:
        return GoogleAuthVerificationDetails.fromJson(jsonData);
      default:
        throw new Error('Unsupported method type');
    }
  }
}
