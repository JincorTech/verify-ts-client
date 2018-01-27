export const initiate_200 = {
  status: 200,
  verificationId: 'dc910ae0-7c67-4ace-8ebb-9edd4b5d8b0f',
  attempts: 0,
  expiredOn: 1505817462,
  payload: {
    your: 'custom payload'
  }
};

export const validate_200 = {
  status: 200,
  data: {
    verificationId: 'dc910ae0-7c67-4ace-8ebb-9edd4b5d8b0f',
    consumer: 'test@test.com',
    expiredOn: 1505817462,
    payload: {
      your: 'custom payload'
    },
    attempts: 0
  }
};
