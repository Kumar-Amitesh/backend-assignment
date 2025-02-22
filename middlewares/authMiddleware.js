// import {verifyToken} from '../utils/jwt.js';

// const authMiddleware = (req, res, next) => {
//     const token = req.cookies.token;
//     console.log(req.cookies)
//     if (!token) return res.status(401).json({ error: "Unauthorized: No token provided" });

//     const decoded = verifyToken(token);
//     if (!decoded) return res.status(401).json({ error: "Unauthorized: Invalid token" });

//     req.user = decoded;
//     next();
// };

// export default authMiddleware;


import { verifyToken } from '../utils/jwt.js';

const authMiddleware = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = decoded;
    next();
};

export default authMiddleware;
