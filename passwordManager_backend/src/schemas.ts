import mongoose from "mongoose";
import {z} from "zod";
import { ZodError } from "zod";
import { Response } from "express";



export const zodInputError = (zodError:ZodError,res:Response)=> {
    const error = zodError.format();
    console.error("Invalid inputs: ",error);
    return res.status(400).json({message: "Invalid inputs: ",error})
}
export const idZod = z.string().min(1);

export const DataZod = z.object({
    url: z.string(),
    websiteName: z.string().min(1).optional(),
    username: z.string(),
    password: z.string().min(1),
})

export const UserZod = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
})



const UserMongooseSchema = new mongoose.Schema({
    username: String,
    password: String
})
export const DataMongooseSchema = new mongoose.Schema({
    url: {type: String, required: true},
    websiteName: {type: String, required: false},
    username: {type: String, required: true},
    password: {type: String, required: true}
})

export const UserMongoose = mongoose.model('User',UserMongooseSchema);
export const DataMongoose = mongoose.model('Data',DataMongooseSchema);
export type Data = z.infer<typeof DataZod> & {id: number};
export type User = z.infer<typeof UserZod>;

export const connectToDatabase = async()=>{
    try{
        await mongoose.connect ('mongodb+srv://shavishanky:Changec110.@cluster0.wfyiwkz.mongodb.net/',{
        dbName: "Password_manager" }) 
        console.log("Database connected successfully")
    }
    catch(error){
        console.error("Error connecting to db: ",error);
    }
}

