// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

import * as request from 'web-request';
import VerifyClientInterface from './verify-client-interface';
import { InitiateData, VerificationTypes } from '../requests/initiate/initiate-data';
import InitiateResult from '../responses/initiate-result';
import ValidateVerificationInput from '../requests/validate-verification-input';
import ValidationResult from '../responses/validation-result';
import VerificationData from '../requests/verification-data';
import Result from '../responses/result';
import {
  MaxVerificationsAttemptsReached,
  NotCorrectVerificationCode,
  VerificationIsNotFound
} from '../exceptions/exceptions';

const QR = require('qr-image');

export class VerifyClient implements VerifyClientInterface {
  constructor(private baseUrl: string, private authToken: string, private maxAttempts: number = 3) {
    request.defaults({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      throwResponseError: true
    });
  }

  async initiateVerification(data: InitiateData): Promise<InitiateResult> {
    const result = await request.json<InitiateResult>(`/methods/${data.method}/actions/initiate`, {
      baseUrl: this.baseUrl,
      auth: {
        bearer: this.authToken
      },
      method: 'POST',
      body: data
    });

    result.method = data.method;
    delete result.code;
    if (result.totpUri) {
      const buffer = QR.imageSync(result.totpUri, {
        type: 'png',
        size: 20
      });
      result.qrPngDataUri = 'data:image/png;base64,' + buffer.toString('base64');
    }

    return result;
  }

  async validateVerification(
    method: VerificationTypes,
    id: string,
    input: ValidateVerificationInput
  ): Promise<ValidationResult> {
    try {
      const response = await request.json<ValidationResult>(
        `/methods/${method}/verifiers/${id}/actions/validate`,
        {
          baseUrl: this.baseUrl,
          auth: {
            bearer: this.authToken
          },
          method: 'POST',
          body: input
        }
      );

      return response;
    } catch (e) {
      if (e.statusCode === 422) {
        if (e.response.body.data.attempts >= this.maxAttempts) {
          await this.invalidateVerification(method, id);
          throw new MaxVerificationsAttemptsReached('You have used all attempts to enter code');
        }

        throw new NotCorrectVerificationCode('Not correct code');
      }

      if (e.statusCode === 404) {
        throw new VerificationIsNotFound('Code was expired or not found. Please retry');
      }

      throw e;
    }
  }

  async invalidateVerification(method: VerificationTypes, id: string): Promise<void> {
    await request.json<Result>(`/methods/${method}/verifiers/${id}`, {
      baseUrl: this.baseUrl,
      auth: {
        bearer: this.authToken
      },
      method: 'DELETE'
    });
  }

  async getVerification(method: VerificationTypes, id: string): Promise<ValidationResult> {
    try {
      const response = await request.json<ValidationResult>(`/methods/${method}/verifiers/${id}`, {
        baseUrl: this.baseUrl,
        auth: {
          bearer: this.authToken
        },
        method: 'GET'
      });

      return response;
    } catch (e) {
      if (e.statusCode === 404) {
        throw new VerificationIsNotFound('Code was expired or not found. Please retry');
      }

      throw e;
    }
  }

  async checkVerificationPayloadAndCode(
    inputVerification: VerificationData,
    consumer: string,
    payload: any,
    removeSecret?: boolean
  ): Promise<ValidationResult> {
    const verification = await this.getVerification(
      inputVerification.method,
      inputVerification.verificationId
    );

    // JSON.stringify is the simplest method to check that 2 objects have same properties
    if (
      !verification.data ||
      verification.data.consumer !== consumer ||
      JSON.stringify(verification.data.payload) !== JSON.stringify(payload)
    ) {
      throw new Error('Invalid verification payload');
    }

    const result = await this.validateVerification(
      inputVerification.method,
      inputVerification.verificationId,
      {
        code: inputVerification.code,
        removeSecret
      }
    );

    return result;
  }
}

const VerificationClientType = Symbol('VerificationClientInterface');
export { VerificationClientType };
