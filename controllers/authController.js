import {generateToken} from '../utils/jwt.js';

const login = (req, res) => {
    const { username, password } = req.body;

    // Hardcoded credentials
    const validUser = {
        username: "naval.ravikant",
        password: "05111974",
    };

    if (username === validUser.username && password === validUser.password) {
        const token = generateToken(username);
        res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true,
            maxAge: 900000});
        return res.status(200).json({ JWT: token });
    } else {
        return res.status(401).json({ error: "Invalid username or password" });
    }
};

export default login;