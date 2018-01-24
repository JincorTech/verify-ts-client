import VerificationMethod from '../verification-method/verification-method';

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
  public static create(methodType: string, data: object): VerificationDetails {
    switch (methodType) {
      case VerificationMethod.METHOD_EMAIL:
        return new EmailVerificationDetails(data);
      case VerificationMethod.METHOD_GOOGLE_AUTH:
        return new GoogleAuthVerificationDetails(data);
      default:
        throw new Error('Unsupported method type');
    }
  }
}
