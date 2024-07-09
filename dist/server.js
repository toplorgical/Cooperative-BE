"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const dbClient_1 = __importDefault(require("./config/dbClient"));
const server = http_1.default.createServer(app_1.default);
const port = config_1.default.PORT;
dbClient_1.default.connect();
server.listen(port, () => {
    console.log(`Server is running on http://localhost: ${port}`);
});
