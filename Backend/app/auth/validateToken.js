"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "secret_user_ctrl";
exports.TokenValidation = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token || token === null)
        return res.status(403).json({ message: 'Accès refusé !' });
    const payload = jsonwebtoken_1.default.verify(token, SECRET_KEY);
    req.userId = payload.id;
    console.log(payload.id, payload.iat, payload.exp);
    next();
};