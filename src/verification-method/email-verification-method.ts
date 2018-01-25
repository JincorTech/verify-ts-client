import VerificationMethod from './verification-method'

/**
 * Class EmailVerification
 */
class EmailVerification extends VerificationMethod {
  public getMethodType() {
    return VerificationMethod.METHOD_EMAIL
  }
}
