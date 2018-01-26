/**
 * Class VerificationResult
 */
class VerificationResult {
  private status: string;
  private consumer: string;
  private verificationId: string;
  private expiredOn: number;
  private payload: string = '';

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

  public static fromJson(jsonData: string): VerificationResult {
    const data = JSON.parse(jsonData);

    VerificationResult.validateData(data, ['status', 'data']);
    VerificationResult.validateData(data, ['verificationId', 'consumer', 'expiredOn']);

    return new VerificationResult(data);
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

  /**
   * @param {any} data
   * @param {any} requiredKeys
   *
   * @throws {Error}
   */
  protected static validateData(data: any, requiredKeys: Array<string>) {
    requiredKeys.forEach((key) => {
      if (!data[key]) {
        throw new Error(`${key} field is required`);
      }
    });
  }
}
