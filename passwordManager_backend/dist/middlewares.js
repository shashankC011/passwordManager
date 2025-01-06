"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'SuperSecr#*';
const generateJwt = (user) => {
    const payload = { username: user.username };
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
};
exports.generateJwt = generateJwt;
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Authentication failed" });
            }
            else {
                // @ts-ignore
                req.headers["username"] = user.username;
                //@ts-ignore
                console.log(user.username);
                next();
            }
        });
    }
    else {
        res.status(403).json({ message: "authentication failed due to no token" });
    }
};
exports.authenticateJwt = authenticateJwt;
