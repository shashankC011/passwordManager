import express,{ Request,Response,Router } from "express";
import { DataZod,UserZod,User,Data,UserMongoose,DataMongoose,zodInputError,idZod } from "./schemas";
import { generateJwt,authenticateJwt } from "./middlewares";
import mongoose from "mongoose";


const router = express.Router();

router.post('/signup', async(req:Request,res:Response)=>{
    const user = UserZod.safeParse(req.body);
    if(!user.success){
        zodInputError(user.error,res);
    }
    else{
        try{
            const existingUser = await UserMongoose.findOne({username: user.data.username})
            if(existingUser){
                return res.status(400).json({message: "User already exists",success:false});
            }
            else{
                const newUser = new UserMongoose({username: user.data.username , password: user.data.password});
                try{
                    await newUser.save();
                    const token = generateJwt(user.data);
                    return res.status(200).json({message: "Signed Up successfully",token,success:true})
                }
                catch(error){
                    console.error("Error Saving to UserMongoose: ",error);
                    return res.status(500).json({message: "Internal server error",success:false});
                }
            }
        }
        catch(error){
            console.error("Error reading UserMongoose: ",error);
            res.status(500).json({message: "Internal server error",success:false})
        }
    }
})
        
router.post('/signin',async(req:Request,res)=>{
    const user = UserZod.safeParse(req.body);
     if(!user.success){
        zodInputError(user.error,res);
    }
    else{
        try{
            const existingUser = await UserMongoose.findOne({username: user.data.username, password: user.data.password});
            if(!existingUser){
                return res.status(403).json({message: "User does not exist"});
            }
            else{
                const token = generateJwt(user.data);
                return res.status(200).json({message: "Signed In successfully",token})
            }
        }
        catch(error){
            console.error("Error reading UserMongoose: ",error);
            return res.status(500).json({message:"Internal server error"});
        }
    }
})

router.get('/',authenticateJwt,async(req:Request,res:Response)=>{
    //get all stored site passowords and other data
    try{
        const data = await DataMongoose.find({});
        res.status(200).json({data});
    }
    catch(error){
        console.error("Error reading dataMongoose: ",error);
        res.status(500).json({message: "Internal server error"})
    }
})

router.get('/me',authenticateJwt,async(req:Request,res:Response)=>{  //accessed to make appbar dynamic(called when appbar is loaded) or to get the username
    res.json({username: req.headers["username"]})
})

router.post('/',authenticateJwt,async(req:Request,res:Response)=>{
    //add new site password data
    const data = DataZod.safeParse(req.body);
    if(!data.success){
        zodInputError(data.error,res);
    }
    else{
        const newData = new DataMongoose(data.data);
        try{
            await newData.save();
            res.status(200).json({message: "Entry added successfully"});   
        }
        catch(error){
            console.error("Error saving to DataMongoose: ",error);
            res.status(500).json({message: "Internal server error "});
        }
    }
})

router.get(`/:id`,authenticateJwt,async(req,res)=>{
    //get a particular site entry
    const id = idZod.safeParse(req.params.id);
    if(!id.success){
        return zodInputError(id.error,res);
    }
    else{
        try{
            const idObj = new mongoose.Types.ObjectId(id.data);
            const data = await DataMongoose.findById(idObj);
            if(!data){
                res.status(404).json({message: "No such site password entry found"});
            }
            else{
                res.status(200).json({data});
            }
        }
        catch(error){
            console.error("Error reading DataMongoose: ",error);
            res.status(500).json({message: "Internal server error",error});
        }
    }
})

router.put(`/:id`,authenticateJwt,async(req,res)=>{
    //edit a data entry
    const id = idZod.safeParse(req.params.id);
    const data = DataZod.safeParse(req.body);
    if(!data.success){
        zodInputError(data.error,res);
    }
    if(!id.success){
        zodInputError(id.error,res);
    }
    else{
        try{
            const idObj = new mongoose.Types.ObjectId(id.data);
            const updatedData = await DataMongoose.findByIdAndUpdate(idObj,data.data,{new:true});
            if(updatedData){
                res.status(200).json({message:"Site entry updated successfully",updatedData})
            } 
            else{
                res.status(404).json({message: "No such entry found"});
            }
        }
        catch(error){
            console.error("Error updating DataMongoose: ",error);
            res.status(500).json({message: "Internal server error",error});
        }
        
    }
})

router.delete("/:id",authenticateJwt,async(req,res)=>{
    const id = idZod.safeParse(req.params.id);
    if(!id.success){
        zodInputError(id.error,res);
    }
    else{
        try{
            const idObj = new mongoose.Types.ObjectId(id.data);
            const deletedData = await DataMongoose.findByIdAndDelete(idObj);
            if(deletedData){
                res.status(200).json({message: "Site entry deleted successfully",deletedData});
            }
            else{
                res.status(404).json({message: "Data not found"});
            }
        }
        catch(error){
            console.error("Error reading DataMongoose while deletion: ",error);
            res.status(500).json({message: "Internal server error ",error});
        } 
    }
})

export default router;