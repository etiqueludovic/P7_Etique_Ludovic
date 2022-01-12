"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const miscMessagesCtrl_1 = require("../controllers/miscMessagesCtrl");
const validateToken_1 = require("../auth/validateToken");
const multerRoutes = require('../middleware/multer');
class MiscPostsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', miscMessagesCtrl_1.miscMessagesCtrls.viewMessages);
        this.router.get('/:id', validateToken_1.TokenValidation, miscMessagesCtrl_1.miscMessagesCtrls.getMessages);
        this.router.post('/addmessage', validateToken_1.TokenValidation, multerRoutes.Multer, miscMessagesCtrl_1.miscMessagesCtrls.addMessages);
        this.router.put('/update/:id', validateToken_1.TokenValidation, miscMessagesCtrl_1.miscMessagesCtrls.updateMessage);
        this.router.delete('/delete/:id', validateToken_1.TokenValidation, miscMessagesCtrl_1.miscMessagesCtrls.deleteMessage);
    }
}
const miscPostRoutes = new MiscPostsRoutes();
exports.default = miscPostRoutes.router;
//# sourceMappingURL=miscMessagesRoutes.js.map