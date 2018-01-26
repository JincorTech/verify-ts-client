import VerificationDetails from './verification-details';

/**
 * Class GoogleAuthVerificationDetails
 */
export default class GoogleAuthVerificationDetails extends VerificationDetails {
  private totpUri: string;

  constructor(data: any) {
    super(data);

    const unwrappedData = data.data || data;
    this.totpUri = unwrappedData.totpUri;
  }
  
  public static fromJson(jsonData: string): GoogleAuthVerificationDetails {
    const data = JSON.parse(jsonData);
    VerificationDetails.validateBaseData(data);
    VerificationDetails.validateData(data, ['totpUri']);
    return new GoogleAuthVerificationDetails(data);
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
