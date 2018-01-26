import Result from './result'

export default interface InitiateResult extends Result {
  verificationId: string
  attempts: number
  expiredOn: number
  method: string
  code?: string
  totpUri?: string
  qrPngDataUri?: string
}
