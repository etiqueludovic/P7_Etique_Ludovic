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
class miscMessagesCtrl {
    viewMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Messages = yield database_1.default.query("SELECT * FROM messages");
            res.status(200).json(Messages);
        });
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const Messages = yield database_1.default.query("SELECT * FROM messages WHERE id = ?", [id]);
            if (Messages.length > 0) {
                return res.status(200).json(Messages[0]);
            }
            res.status(404).json({ message: "Messages doesn't finded!" });
        });
    }
    addMessages(req, res) {
        const newMessages = {
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userId,
            imageUrl: req.body.imageUrl,
            username: req.body.username
        };
            
        console.log("ici ce trouve le backend message 1 : "+`${req.protocol}://${req.get('host')}/images/${req.body.imageUrl}`)
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO messages SET ?", [newMessages]);
            console.log("ici ce trouve le backend message 2 : "+newMessages)
            res.status(200).json({ message: "Messages Added!" });
        });
    }
    updateMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updateMessages = {
                Messages: req.body.Messages
            };
            yield database_1.default.query("UPDATE messages SET ? WHERE id = ?", [updateMessages, id]);
            res.status(200).json({ message: "Messages Updated!" });
        });
    }
    deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM messages WHERE id = ?", [id]);
            res.status(200).json({ message: "Messages Deleted!" });
        });
    }
}
exports.miscMessagesCtrls = new miscMessagesCtrl();
exports.default = miscMessagesCtrl;
//# sourceMappingURL=miscMessagesCtrl.js.map