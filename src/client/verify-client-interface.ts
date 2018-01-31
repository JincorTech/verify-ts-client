import { InitiateData } from '../requests/initiate/initiate-data';
import InitiateResult from '../responses/initiate-result';
import ValidateVerificationInput from '../requests/validate-verification-input';
import ValidationResult from '../responses/validation-result';
import VerificationData from '../requests/verification-data';
import Result from '../responses/result';

export default interface VerificationClientInterface {
  initiateVerification(data: InitiateData): Promise<InitiateResult>;
  validateVerification(
    method: string,
    id: string,
    input: ValidateVerificationInput
  ): Promise<ValidationResult>;
  invalidateVerification(method: string, id: string): Promise<Result>;
  getVerification(method: string, id: string): Promise<ValidationResult>;
  checkVerificationPayloadAndCode(
    input: VerificationData,
    consumer: string,
    payload: any,
    removeSecret?: boolean
  ): Promise<ValidationResult>;
};
