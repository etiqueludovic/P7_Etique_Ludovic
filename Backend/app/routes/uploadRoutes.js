"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadControllers_1 = require("./../controllers/uploadController");
const multerRoutes = require('../middleware/multer');
class UploadRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', multerRoutes, uploadControllers_1.uploadController.upload);
    }
}
const uploadRoutes = new UploadRoutes();
exports.default = uploadRoutes.router;