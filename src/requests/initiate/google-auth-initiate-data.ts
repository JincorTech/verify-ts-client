import InitiateDataBase from './initiate-data-base';
import { VerificationTypes } from './initiate-data';

export default class GoogleAuthInitiateData extends InitiateDataBase {
  public issuer: string;

  constructor(consumer: string, issuer: string) {
    super(VerificationTypes.GoogleAuthVerification, consumer);
    this.issuer = issuer;
  }

  public setIssuer(issuer: string) {
    this.issuer = issuer;
    return this;
  }
}
