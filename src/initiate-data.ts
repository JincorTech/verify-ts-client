export default interface InitiateData {
  consumer: string
  issuer?: string
  template?: {
    body: string
    fromEmail?: string
    subject?: string
  }
  generateCode?: {
    length: number
    symbolSet: Array<string>
  }
  policy: {
    expiredOn: string
  }
  payload?: any
}
