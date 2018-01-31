import InitiateDataBase from './initiate-data-base';
import { EmailType, VerificationTypes } from './initiate-data';
import logger from '../../logger/logger';

export default class EmailInitiateData extends InitiateDataBase {
  public template: EmailType;

  constructor(consumer: string, email: EmailType) {
    super(VerificationTypes.EmailVerification, consumer);
    this.template = email;
  }

  public setEmail(email: EmailType) {
    this.template = email;
    return this;
  }
}
