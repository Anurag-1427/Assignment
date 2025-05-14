import client from '../client';

export const loginUser = (mobile: string) => {
    return client.post('/login', { mobile });
};

export const verifyOtp = (mobile: string, otp: string) => {
    return client.post('/otp-verify', { mobile, otp });
};
