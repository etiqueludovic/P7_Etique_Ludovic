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
class UserControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query('SELECT * FROM users');
            res.json(users);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const users = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
            if (users.length > 0) {
                return res.json(users[0]);
            }
            res.status(404).json({ message: "User doesn't exists!" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                password: req.body.password,
                email: req.body.email,
                username: req.body.username
            };
            newUser.password = yield helpers_1.hashUser.encryptPassword(newUser.password);
            yield database_1.default.query('INSERT INTO users SET ?', [newUser]);
            res.json({ message: 'User was Saved!' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updateUser = {
                username: req.body.username,
                //password: req.body.password,
                email: req.body.email
            };
            console.log(updateUser);
            //updateUser.password = await hashUser.encryptPassword(updateUser.password);
            /*await pool.query('UPDATE users SET ? WHERE id = ?', [updateUser, id]);
            res.json({message: 'The User was Updated!'});*/
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM users WHERE id = ?', [id]);
            res.json({ message: 'The User was deleted!' });
        });
    }
}
exports.userController = new UserControllers();
exports.default = UserControllers;
//# sourceMappingURL=userControllers.js.map