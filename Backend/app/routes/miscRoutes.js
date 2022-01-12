"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const miscController_1 = require("../controllers/miscController");
const validateToken_1 = require("../auth/validateToken");
class MiscRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', validateToken_1.TokenValidation, miscController_1.miscControllers.viewRole);
        this.router.get('/:id', validateToken_1.TokenValidation, miscController_1.miscControllers.getRole);
        this.router.post('/', validateToken_1.TokenValidation, miscController_1.miscControllers.addRole);
        this.router.put('/:id', validateToken_1.TokenValidation, miscController_1.miscControllers.updateRole);
        this.router.delete('/:id', validateToken_1.TokenValidation, miscController_1.miscControllers.deleteRole);
    }
}
const miscRoutes = new MiscRoutes();
exports.default = miscRoutes.router;
//# sourceMappingURL=miscRoutes.js.map