import { RequestOptions } from 'web-request';

export default abstract class VerificationMethod {
  public static METHOD_EMAIL = 'email';
  public static METHOD_GOOGLE_AUTH = 'google_auth';

  public abstract getMethodType(): string;

  public abstract getRequestParameters(): RequestOptions;

  public getAllowedMethods(): Array<string> {
    return [
      VerificationMethod.METHOD_EMAIL,
      VerificationMethod.METHOD_GOOGLE_AUTH
    ];
  }

  public validateMethodType(methodType: string): void {
    if (!this.getAllowedMethods().includes(methodType)) {
      throw new Error('Unsupported method type');
    }
  }
}
