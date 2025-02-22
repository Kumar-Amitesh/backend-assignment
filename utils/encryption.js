// Description: Encryption utility functions.
import CryptoJS from "crypto-js";

const encryptData = (text) => {
    return CryptoJS.AES.encrypt(text, process.env.ENCRYPTION_KEY).toString();
};

const decryptData = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, process.env.ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export {
    encryptData,
    decryptData,
};