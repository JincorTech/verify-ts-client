import { VerificationTypes } from './initiate/initiate-data';

export default interface VerificationData {
  verificationId: string;
  code: string;
  method: VerificationTypes;
};
