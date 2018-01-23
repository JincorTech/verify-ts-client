/**
 * Class VerificationDetails
 */
abstract class VerificationDetails {
  protected status: string;
  protected verificationId: string;
  protected expiredOn: number;
  protected consumer: string;
  protected payload: string = '';
  protected attempts: number;

  //TODO: Implement constructor
  constructor() { }

  /**
   * @return {string}
   */
  public getStatus(): string {
    return this.status;
  }

  /**
   * @return {string}
   */
  public getVerificationId(): string {
    return this.verificationId;
  }

  /**
   * @return {number}
   */
  public getExpiredOn(): number {
    return this.expiredOn;
  }

  /**
   * @return {string}
   */
  public getConsumer(): string {
    return this.consumer;
  }

  /**
   * @return {string}
   */
  public getPayload(): string {
    return this.payload;
  }

  /**
   * @return {number}
   */
  public getAttempts(): number {
    return this.attempts;
  }
}
