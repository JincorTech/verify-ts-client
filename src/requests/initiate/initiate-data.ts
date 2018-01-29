enum VerificationTypes {
  GoogleAuthVerification = 'google_auth',
  EmailVerification = 'email'
}

type EmailType = {
  body: string;
  fromEmail?: string;
  subject?: string;
};

interface InitiateData {
  method: VerificationTypes;
  consumer: string;
  issuer?: string;
  template?: EmailType;
  generateCode?: {
    length: number;
    symbolSet: string[];
  };
  policy: {
    expiredOn: string;
  };
  payload?: any;
}

export { VerificationTypes, EmailType, InitiateData };
