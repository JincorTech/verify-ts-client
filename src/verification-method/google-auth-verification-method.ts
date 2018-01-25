import VerificationMethod from './verification-method'

/**
 * Class GoogleAuthVerification
 */
class GoogleAuthVerification extends VerificationMethod {
  private issuer: string

  public getMethodType() {
    return VerificationMethod.METHOD_GOOGLE_AUTH
  }

  public setIssuer(issuer: string): GoogleAuthVerification {
    this.issuer = issuer
    return this
  }

  public getRequestBody(): any {
    return {
      ...super.getRequestBody(),
      issuer: this.issuer
    }
  }
}
