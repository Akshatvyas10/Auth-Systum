import jwt from 'jsonwebtoken';
import { Request,Response ,NextFunction} from 'express';
import dotenv from 'dotenv';
dotenv.config()
const key:string|any = process.env.JWT_KEY;
const authenticateJWT =(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers['authorization'];
    console.log('token found ',token)
    if(!token){
        console.log('token not found ',token)
      return  res.status(401).json({'message':'Unauthorized '})
    }
    else{
        jwt.verify(token,key,(err: any)=>{
            if(err){
                console.log('err = = = = ',err)
                return res.status(403).json({'message':'Unauthorized with 403'})
            }
            next()
        })
    }
}
export default authenticateJWT