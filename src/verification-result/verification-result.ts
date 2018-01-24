/**
 * Class VerificationResult
 */
class VerificationResult {
  private status: string;
  private consumer: string;
  private verificationId: string;
  private expiredOn: number;
  private payload: string = '';

  //TODO: Implement constructor
  constructor(data: any) {
    if (!data) {
      return;
    }

    this.status = data.status;
    const unwrappedData = data.data;
    if (!unwrappedData) {
      return;
    }

    this.consumer = unwrappedData.consumer;
    this.verificationId = unwrappedData.verificationId;
    this.expiredOn = unwrappedData.expiredOn;
    this.payload = unwrappedData.payload || '';
  }

  /**
   * Status
   *
   * @return {string}
   */
  public getStatus(): string {
    return this.status;
  }

  /**
   * Consumer
   *
   * @return {string}
   */
  public getConsumer(): string {
    return this.consumer;
  }

  /**
   * ValidationId
   *
   * @return {string}
   */
  public getVerificationId(): string {
    return this.verificationId;
  }

  /**
   * ExpiredOn
   *
   * @return {number}
   */
  public getExpiredOn(): number {
    return this.expiredOn;
  }

  /**
   * @return {string}
   */
  public getPayload(): string {
    return this.payload;
  }
}
