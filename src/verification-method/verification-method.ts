import { RequestOptions } from 'web-request'
import GenerateCodeSymbols from './generate-code-symbols'

export default abstract class VerificationMethod {
  public static METHOD_EMAIL = 'email'
  public static METHOD_GOOGLE_AUTH = 'google_auth'
  private static MIN_LENGTH = 2

  protected consumer: string
  protected template: {
    body: string
  }
  protected policy: {
    expiredOn: string
  }
  protected generateCode: {
    length: number
    symbolsSet: string[]
  }
  protected forcedVerificationId: string
  protected forcedCode: string
  protected payload: any

  public setForcedCode(forcedCode: string): VerificationMethod {
    this.forcedCode = forcedCode
    return this
  }

  public setForcedVerificationId(forcedVerificationId: string): VerificationMethod {
    this.forcedVerificationId = forcedVerificationId
    return this
  }

  public setExpiredOn(expiredOn: string): VerificationMethod {
    this.policy.expiredOn = expiredOn
    return this
  }

  public setConsumer(consumer: string): VerificationMethod {
    this.consumer = consumer
    return this
  }

  public setTemplate(template: string): VerificationMethod {
    this.template.body = template
    return this
  }

  public setGenerateCode(symbolsSet: string[], length: number): VerificationMethod {
    if (length <= VerificationMethod.MIN_LENGTH) {
      throw new Error('Too short length')
    }

    symbolsSet.forEach(set => {
      if (!set || !Object.values(GenerateCodeSymbols).includes(set)) {
        throw new Error('Invalid symbol set')
      }
    })

    this.generateCode = {
      symbolsSet: symbolsSet,
      length: length
    }

    return this
  }

  public setPayload(payload: string): VerificationMethod {
    this.payload = payload
    return this
  }

  public setTemplateBody(body: string): VerificationMethod {
    this.template.body = body
    return this
  }

  public getRequestBody(): any {
    return {
      consumer: this.consumer,
      template: this.template,
      policy: {
        expiredOn: this.policy.expiredOn,
        forcedVerificationId: this.forcedVerificationId,
        forcedCode: this.forcedCode
      },
      generateCode: this.generateCode,
      payload: this.payload
    }
  }

  public abstract getMethodType(): string

  public getAllowedMethods(): string[] {
    return [VerificationMethod.METHOD_EMAIL, VerificationMethod.METHOD_GOOGLE_AUTH]
  }

  public validateMethodType(methodType: string): void {
    if (!this.getAllowedMethods().includes(methodType)) {
      throw new Error('Unsupported method type')
    }
  }
}
