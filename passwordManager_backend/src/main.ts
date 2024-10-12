import express from "express";

import routes from "./routes";
import { connectToDatabase } from "./schemas";
import cors from "cors";
const app = express();

app.use(cors());
const port = 5005;
app.use(express.json());

app.use('/',routes);


connectToDatabase();


app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})
