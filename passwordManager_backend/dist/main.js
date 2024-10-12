"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const schemas_1 = require("./schemas");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 5005;
app.use(express_1.default.json());
app.use('/', routes_1.default);
(0, schemas_1.connectToDatabase)();
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
