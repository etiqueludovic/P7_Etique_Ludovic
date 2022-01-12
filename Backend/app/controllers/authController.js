"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
const helpers_1 = require("./../helpers");
const SECRET_KEY = "secret_user_ctrl";
class AuthControllers {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = {
                    email: req.body.email,
                    password: req.body.password,
                    username: req.body.username,
                    userId: req.body.userId
                };
                const expireIn = 18000; // 18000 ms = 5 hrs
                const search = yield database_1.default.query("SELECT * FROM users WHERE email = ?", [userData.email]);
                if (search.length > 0) { console.log(search[0].username); }
                else {
                    res.status(404).json({ message: 'Email non reconnu !' });
                }
                const userPassStored = search[0].password;
                const validate = yield helpers_1.hashUser.matchPassword(userData.password, userPassStored);
                if (!validate) {
                    return res.status(404).json({ message: "Mot de passe invalide !" });
                }
                const token = jsonwebtoken_1.default.sign({ id: search[0].id }, SECRET_KEY, {
                    expiresIn: expireIn
                });
                return res.status(200).json({ token, id: search[0].id, username: search[0].username });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield database_1.default.query("SELECT * FROM users WHERE id = ?", [req.userId]);
            if (userData.length > 0)
                return res.status(200).json(userData[0]);
        });
    }
}
exports.AuthController = new AuthControllers();
exports.default = AuthControllers;
//# sourceMappingURL=authController.js.map