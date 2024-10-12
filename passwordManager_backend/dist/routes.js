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
const express_1 = __importDefault(require("express"));
const schemas_1 = require("./schemas");
const middlewares_1 = require("./middlewares");
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = schemas_1.UserZod.safeParse(req.body);
    if (!user.success) {
        (0, schemas_1.zodInputError)(user.error, res);
    }
    else {
        try {
            const existingUser = yield schemas_1.UserMongoose.findOne({ username: user.data.username });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            else {
                const newUser = new schemas_1.UserMongoose({ username: user.data.username, password: user.data.password });
                try {
                    yield newUser.save();
                    const token = (0, middlewares_1.generateJwt)(user.data);
                    return res.status(200).json({ message: "Signed Up successfully", token });
                }
                catch (error) {
                    console.error("Error Saving to UserMongoose: ", error);
                    return res.status(500).json({ message: "Internal server error" });
                }
            }
        }
        catch (error) {
            console.error("Error reading UserMongoose: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request body:", req.body); // Add this line for debugging
    const user = schemas_1.UserZod.safeParse(req.body);
    console.log("Parsed user:", user); // Add this line for debugging   
    if (!user.success) {
        (0, schemas_1.zodInputError)(user.error, res);
    }
    else {
        try {
            const existingUser = yield schemas_1.UserMongoose.findOne({ username: user.data.username, password: user.data.password });
            if (!existingUser) {
                return res.status(403).json({ message: "User does not exist" });
            }
            else {
                const token = (0, middlewares_1.generateJwt)(user.data);
                return res.status(200).json({ message: "Signed In successfully", token });
            }
        }
        catch (error) {
            console.error("Error reading UserMongoose: ", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}));
router.get('/', middlewares_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get all stored site passowords and other data
    try {
        const data = yield schemas_1.DataMongoose.find({});
        res.status(200).json({ data });
    }
    catch (error) {
        console.error("Error reading dataMongoose: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.post('/', middlewares_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //add new site password data
    const data = schemas_1.DataZod.safeParse(req.body);
    if (!data.success) {
        (0, schemas_1.zodInputError)(data.error, res);
    }
    else {
        const newData = new schemas_1.DataMongoose(data.data);
        try {
            yield newData.save();
            res.status(200).json({ message: "Entry added successfully" });
        }
        catch (error) {
            console.error("Error saving to DataMongoose: ", error);
            res.status(500).json({ message: "Internal server error " });
        }
    }
}));
router.get(`/:id`, middlewares_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get a particular site entry
    const id = schemas_1.idZod.safeParse(req.params.id);
    if (!id.success) {
        return (0, schemas_1.zodInputError)(id.error, res);
    }
    else {
        try {
            const idObj = new mongoose_1.default.Types.ObjectId(id.data);
            const data = yield schemas_1.DataMongoose.findById(idObj);
            if (!data) {
                res.status(404).json({ message: "No such site password entry found" });
            }
            else {
                res.status(200).json({ data });
            }
        }
        catch (error) {
            console.error("Error reading DataMongoose: ", error);
            res.status(500).json({ message: "Internal server error", error });
        }
    }
}));
router.put(`/:id`, middlewares_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //edit a data entry
    const id = schemas_1.idZod.safeParse(req.params.id);
    const data = schemas_1.DataZod.safeParse(req.body);
    if (!data.success) {
        (0, schemas_1.zodInputError)(data.error, res);
    }
    if (!id.success) {
        (0, schemas_1.zodInputError)(id.error, res);
    }
    else {
        try {
            const idObj = new mongoose_1.default.Types.ObjectId(id.data);
            const updatedData = yield schemas_1.DataMongoose.findByIdAndUpdate(idObj, data.data, { new: true });
            if (updatedData) {
                res.status(200).json({ message: "Site entry updated successfully", updatedData });
            }
            else {
                res.status(404).json({ message: "No such entry found" });
            }
        }
        catch (error) {
            console.error("Error updating DataMongoose: ", error);
            res.status(500).json({ message: "Internal server error", error });
        }
    }
}));
router.delete("/:id", middlewares_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = schemas_1.idZod.safeParse(req.params.id);
    if (!id.success) {
        (0, schemas_1.zodInputError)(id.error, res);
    }
    else {
        try {
            const idObj = new mongoose_1.default.Types.ObjectId(id.data);
            ;
            const deletedData = yield schemas_1.DataMongoose.findByIdAndDelete(idObj);
            if (deletedData) {
                res.status(200).json({ message: "Site entry deleted successfully", deletedData });
            }
            else {
                res.status(404).json({ message: "Data not found" });
            }
        }
        catch (error) {
            console.error("Error reading DataMongoose while deletion: ", error);
            res.status(500).json({ message: "Internal server error ", error });
        }
    }
}));
exports.default = router;
