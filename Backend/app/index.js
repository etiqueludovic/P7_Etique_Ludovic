"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importDefault(require("express"));
const morgan = __importDefault(require("morgan"));
const cors = __importDefault(require("cors"));
const authRoutes = __importDefault(require("./routes/authRoutes"));
const registerRoutes = __importDefault(require("./routes/registerRoutes"));
const userRoutes = __importDefault(require("./routes/userRoutes"));
const miscRoutes = __importDefault(require("./routes/miscRoutes"));
const miscMessagesRoutes = __importDefault(require("./routes/miscMessagesRoutes"));
const uploadController =  __importDefault(require("./routes/miscMessagesRoutes"));
const path =  __importDefault(require('path'));

class Server {
    constructor() {
        this.app = express.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan.default('dev'));
        this.app.use(cors.default({ origin: 'http://localhost:4200' || 'http://127.0.0.1:4200' }));
        this.app.use(express.default.json());
        this.app.use(express.default.urlencoded({ extended: false }));
        this.app.use(express.default.static('images'));
    }
    routes() {
        this.app.use('/api/users', userRoutes.default);
        this.app.use('/api/ext/misc', miscRoutes.default);
        this.app.use('/api/auth/login', authRoutes.default);
        this.app.use('/api/auth/profile', authRoutes.default);
        this.app.use('/api/auth/register', registerRoutes.default);
        this.app.use('/api/messages', miscMessagesRoutes.default);
        this.app.use('/images', uploadController.default);
        this.app.use('/images', (express.default.static(path.default.join(__dirname, 'images')))); 
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=index.js.map