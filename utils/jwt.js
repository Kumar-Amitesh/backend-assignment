import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (username) => {
    return jwt.sign({
        username
    }, SECRET_KEY, {
        expiresIn: '1h',
    });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export {
    generateToken,
    verifyToken
};