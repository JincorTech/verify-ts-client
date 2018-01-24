import { RequestOptions } from 'web-request';

/**
 * Class ValidationData
 */
export default abstract class ValidationData {
  constructor(private verificationId: string) {
  }

  public abstract getMethodType(): string;

  public abstract getRequestParameters(): RequestOptions;

  public getVerificationId(): string {
    return this.verificationId;
  }
}
