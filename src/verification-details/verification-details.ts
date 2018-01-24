/**
 * Class VerificationDetails
 */
export default abstract class VerificationDetails {
  protected status: string;
  protected verificationId: string;
  protected expiredOn: number;
  protected consumer: string;
  protected payload: string = '';
  protected attempts: number;

  constructor(data: any) {
    if (!data) {
      return;
    }

    this.status = data.status;

    const unwrappedData = data.data || data;

    this.verificationId = data.verificationId;
    this.expiredOn = data.expiredOn;
    this.consumer = data.consumer;
    this.payload = data.payload || '';
    this.attempts = data.attempts;
  }

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

  /**
     * @param {any} data
     * @param {any} requiredKeys
     *
     * @throws {Error}
     */
  public validateData(data: any, requiredKeys: Array<string>) {
    requiredKeys.forEach((key) => {
      if (!data[key]) {
        throw new Error(`${key} field is required`);
      }
    });
  }
}
