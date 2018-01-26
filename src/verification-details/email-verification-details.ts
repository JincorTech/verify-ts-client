import VerificationDetails from './verification-details';

/**
 * Class EmailVerificationDetails
 */
export default class EmailVerificationDetails extends VerificationDetails
{
  constructor(data: any) {
    super(data);
  }

  public static fromJson(jsonData: string): EmailVerificationDetails {
    const data = JSON.parse(jsonData);
    VerificationDetails.validateBaseData(data);
    return new EmailVerificationDetails(data);
  }
}
