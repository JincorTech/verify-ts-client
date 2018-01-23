/**
 * Class ValidationData
 */
abstract class ValidationData {
  constructor(private verificationId: string) {
  }

  public abstract getMethodType(): string;

  public abstract getRequestParameters(): Array<any>;

  public getVerificationId(): string {
    return this.verificationId;
  }
}
