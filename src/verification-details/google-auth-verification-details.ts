import VerificationDetails from './verification-details';

/**
 * Class GoogleAuthVerificationDetails
 */
class GoogleAuthVerificationDetails extends VerificationDetails {
  private totpUri: string;

  constructor(data: any) {
    super(data);

    const unwrappedData = data.data || data;
    this.totpUri = unwrappedData.totpUri;
  }

  /**
   * TOTP URI
   *
   * @return {string}
   */
  public getTotpUri(): string {
    return this.totpUri;
  }
}
