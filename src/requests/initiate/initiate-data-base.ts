import { InitiateData, VerificationTypes } from './initiate-data';

export default abstract class InitiateDataBase implements InitiateData {
  public consumer: string;
  public generateCode: {
    length: number;
    symbolSet: string[];
  } = {
    length: 6,
    symbolSet: ['DIGITS']
  };
  public policy: {
    expiredOn: string;
  } = {
    expiredOn: '01:00:00'
  };
  public payload?: any;

  constructor(public method: VerificationTypes, consumer: string) {}

  public setConsumer(consumer: string) {
    this.consumer = consumer;
    return this;
  }

  public setGenerateCode(length: number, symbolSet: string[]) {
    this.generateCode = {
      length: length,
      symbolSet: symbolSet
    };
    return this;
  }

  public setPolicy(expiredOn: string) {
    this.policy = {
      expiredOn: expiredOn
    };
    return this;
  }

  public setPayload(payload: any) {
    this.payload = payload;
    return this;
  }
}
