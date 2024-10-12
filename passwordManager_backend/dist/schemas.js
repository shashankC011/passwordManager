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
exports.connectToDatabase = exports.DataMongoose = exports.UserMongoose = exports.UserZod = exports.DataZod = exports.idZod = exports.zodInputError = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const zodInputError = (zodError, res) => {
    const error = zodError.format();
    console.error("Invalid inputs: ", error);
    return res.status(400).json({ message: "Invalid inputs: ", error });
};
exports.zodInputError = zodInputError;
exports.idZod = zod_1.z.string().min(1);
exports.DataZod = zod_1.z.object({
    url: zod_1.z.string(),
    websiteName: zod_1.z.string().min(1).optional(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(1),
});
exports.UserZod = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1)
});
const UserMongooseSchema = new mongoose_1.default.Schema({
    username: String,
    password: String
});
const DataMongooseSchema = new mongoose_1.default.Schema({
    url: { type: String, required: true },
    websiteName: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true }
});
exports.UserMongoose = mongoose_1.default.model('User', UserMongooseSchema);
exports.DataMongoose = mongoose_1.default.model('Data', DataMongooseSchema);
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb+srv://shavishanky:Changec110.@cluster0.wfyiwkz.mongodb.net/', {
            dbName: "Password_manager"
        });
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Error connecting to db: ", error);
    }
});
exports.connectToDatabase = connectToDatabase;
