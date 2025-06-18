import CryptoJS from "crypto-js";

export const generateSalt = (): string => {
  return CryptoJS.lib.WordArray.random(128 / 8).toString();
};

export const hashPassword = (data: string, salt: string) => {
  return CryptoJS.PBKDF2(data, salt, {
    keySize: 256 / 32,
    iterations: 1000,
  }).toString();
};
