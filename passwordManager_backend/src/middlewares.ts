import jwt,{JwtPayload} from "jsonwebtoken";
import { Response,Request,NextFunction } from "express";
const secretKey = 'SuperSecr#*';

export const generateJwt = (user: JwtPayload)=>{
    const payload = {username: user.username}
    return jwt.sign(payload,secretKey,{expiresIn:'1h'});
}

export const authenticateJwt = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token,secretKey,(err,user)=>{
            if(err){
                return res.status(403).json({message: "Authentication failed"});
            }
            else{
                next();
            }
        })
    }
    else{
        res.status(403).json({message: "authentication failed due to no token"})
    }
}