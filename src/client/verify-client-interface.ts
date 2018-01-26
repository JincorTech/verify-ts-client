import InitiateData from '../requests/initiate-data'
import InitiateResult from '../responses/initiate-result'
import ValidateVerificationInput from '../requests/validate-verification-input'
import ValidationResult from '../responses/validation-result'
import VerificationData from '../requests/verification-data'

export default interface VerificationClientInterface {
  initiateVerification(method: string, data: InitiateData): Promise<InitiateResult>
  validateVerification(
    method: string,
    id: string,
    input: ValidateVerificationInput
  ): Promise<ValidationResult>
  invalidateVerification(method: string, id: string): Promise<void>
  getVerification(method: string, id: string): Promise<ValidationResult>
  checkVerificationPayloadAndCode(
    input: VerificationData,
    consumer: string,
    payload: any,
    removeSecret?: boolean
  ): Promise<ValidationResult>
}
