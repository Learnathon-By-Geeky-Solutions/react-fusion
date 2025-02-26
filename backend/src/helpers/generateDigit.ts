export const generateOTP = (n: number) => {
    return Math.floor(Math.pow(10, n - 1) + Math.random() * (Math.pow(10, n) - Math.pow(10, n - 1)));
};
