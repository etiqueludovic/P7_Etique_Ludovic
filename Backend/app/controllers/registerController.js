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
const database_1 = __importDefault(require("../database"));
const helpers_1 = require("./../helpers");
class RegisterControllers {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                //username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                username: req.body.username,
                isAdmin: 0,
               // picture: '',
               // bio: ''
            };
            newUser.password = yield helpers_1.hashUser.encryptPassword(newUser.password);
            const result = yield database_1.default.query('INSERT INTO users SET  ?', [newUser]);
            res.status(200).json({ message: 'User was Registered!' });
        });
    }
}
exports.RegisterController = new RegisterControllers();
exports.default = RegisterControllers;
//# sourceMappingURL=registerController.js.map