import InitiateData from './initiate-data'
import InitiateResult from './initiate-result'
import ValidateVerificationInput from './validate-verification-input'
import ValidationResult from './validation-result'
import VerificationData from './verification-data'

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
