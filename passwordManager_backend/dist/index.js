"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const port = 5005;
const secretKey = 'SuperSecr#*';
const generateJwt = (user) => {
    const payload = { username: user.username };
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
};
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Authentication failed" });
            }
            else {
                next();
            }
        });
    }
    else {
        res.status(403).json({ message: "authentication failed due to no token" });
    }
};
app.use(express_1.default.json());
app.post('/signup', (req, res) => {
    const user = req.body;
    fs_1.default.readFile("users.txt", "utf-8", (err, data) => {
        if (err) {
            console.log("there was some error reading users.txt");
            res.status(500);
            return;
        }
        else {
            const JsonUserData = JSON.parse(data);
            const existingUser = JsonUserData.find(u => u.username == user.username);
            if (existingUser) {
                res.status(403).json({ message: "User already exists" });
                return;
            }
            else {
                JsonUserData.push(user);
                fs_1.default.writeFile("users.txt", JSON.stringify(JsonUserData), (err) => {
                    if (err) {
                        console.log("error reading users.txt");
                        res.status(500);
                        return;
                    }
                    else {
                        const token = generateJwt(user);
                        res.status(200).json({ message: "Signed up successfully", token });
                        return;
                    }
                });
            }
        }
    });
});
app.post('/signin', (req, res) => {
    const user = req.body;
    fs_1.default.readFile("users.txt", "utf-8", (err, data) => {
        if (err) {
            console.log("error reading users.txt");
            res.status(500);
            return;
        }
        else {
            const JsonUserData = JSON.parse(data);
            const existingUser = JsonUserData.find(u => u.username == user.username);
            if (!existingUser) {
                res.status(403).json({ message: "User does not exist. Please Sign up" });
                return;
            }
            else {
                const token = generateJwt(user);
                res.status(200).json({ message: "Signed in successfully", token });
            }
        }
    });
});
app.get('/', authenticateJwt, (req, res) => {
    fs_1.default.readFile('data.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log("error reading data.txt");
            res.status(403);
            return;
        }
        else {
            const Jsondata = JSON.parse(data);
            res.status(200).json({ data: Jsondata });
            return;
        }
    });
});
app.post('/', authenticateJwt, (req, res) => {
    fs_1.default.readFile('data.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log("error reading data.txt");
            res.status(403);
            return;
        }
        else {
            const JsonData = JSON.parse(data);
            const newData = req.body;
            newData.id = Date.now();
            JsonData.push(newData);
            fs_1.default.writeFile('data.txt', JSON.stringify(JsonData), (err) => {
                if (err) {
                    console.log("error writing to data.txt");
                    res.status(403);
                    return;
                }
                else {
                    res.status(200).json({ message: "Added" });
                    return;
                }
            });
        }
    });
});
app.get(`/:id`, authenticateJwt, (req, res) => {
    const id = req.params.id;
    const NumId = parseInt(id);
    fs_1.default.readFile(`data.txt`, "utf-8", (err, data) => {
        if (err) {
            console.log("error reading to data.txt");
        }
        else {
            const JsonData = JSON.parse(data);
            const reqData = JsonData.filter(data => data.id === NumId);
            if (!reqData) {
                res.status(500).json({ message: "no such data" });
            }
            else {
                res.status(200).json({ data: reqData });
            }
        }
    });
});
app.put(`/:id`, authenticateJwt, (req, res) => {
    const id = req.params.id;
    const NumId = parseInt(id);
    const newData = req.body;
    let dataFound = false;
    fs_1.default.readFile('data.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log("error reading data.txt");
        }
        else {
            const JsonData = JSON.parse(data);
            const updatedJsonData = JsonData.map(data => {
                if (data.id == NumId) {
                    dataFound = true;
                    return Object.assign(Object.assign({}, data), newData);
                }
                return data;
                //{ ...course, ...changedCourse }: This creates a new object with all the properties of course, and then it adds (or overwrites) properties from changedCourse.
            });
            if (!dataFound) {
                res.status(403).json({ message: "could not find any such data" });
                return;
            }
            fs_1.default.writeFile('data.txt', JSON.stringify(updatedJsonData), (err) => {
                if (err) {
                    console.log("error writing to data.txt");
                }
                else {
                    res.status(200).json({ message: "Updated succesfully" });
                    return;
                }
            });
        }
    });
});
app.delete("/:id", authenticateJwt, (req, res) => {
    const id = req.params.id;
    const NumId = parseInt(id);
    fs_1.default.readFile("data.txt", "utf-8", (err, data) => {
        if (err) {
            console.log("error reading data.txt");
            res.status(403);
        }
        else {
            const JsonData = JSON.parse(data);
            const updatedJsonData = JsonData.filter(data => data.id !== NumId);
            fs_1.default.writeFile("data.txt", JSON.stringify(updatedJsonData), (err) => {
                if (err) {
                    console.log("error writing to data.txt");
                    res.status(403);
                }
                else {
                    res.status(200).json({ message: "deleted successfully" });
                }
            });
        }
    });
});
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
