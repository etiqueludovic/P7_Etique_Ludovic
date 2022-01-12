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
class miscController {
    // Roles
    viewRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield database_1.default.query("SELECT * FROM role");
            res.status(200).json(roles);
        });
    }
    getRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const role = yield database_1.default.query('SELECT * FROM role WHERE id = ?', [id]);
            if (role.length > 0) {
                return res.status(200).json(role[0]);
            }
            res.status(404).json({ message: "Role doesn't finded!" });
        });
    }
    addRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRole = {
                role: req.body.role,
                role_descrip: req.body.role_descrip
            };
            console.log(newRole);
            yield database_1.default.query("INSERT INTO role SET ?", [newRole]);
            res.status(200).json({ message: 'Role Saved!' });
        });
    }
    updateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updateRole = {
                role: req.body.role,
                role_descrip: req.body.role_descrip
            };
            yield database_1.default.query("UPDATE role SET ? WHERE id = ?", [updateRole, id]);
            res.status(200).json({ message: 'Role Updated!' });
        });
    }
    deleteRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM role WHERE id = ?", [id]);
            res.status(200).json({ message: 'Role Deleted!' });
        });
    }
}
exports.miscControllers = new miscController();
exports.default = miscController;
//# sourceMappingURL=miscController.js.map