import customresponsecode from "../configure/responsecode.json"
import httpresponsecode from  "../configure/httpresponsecode.json"
import response from "../configure/response"
import mongoErrorCode from "../configure/mongoErrorCode.json"
import hashing from "../utils/encrypt"
import { signUpRepo } from "../repo/authRepo"
import tokenService from "../utils/token"
import { getUser } from "../repo/userRepo"

export async function signUp(req,res,next){
    try {
        let {name,email,password} = req.body
        password = await hashing.encryptPassword(password);
        let result = await signUpRepo(name,email,password);
        let tokenDetails = tokenService.createToken({id:result._id,email:result.email}, "1h", "1d")
        return res.status(httpresponsecode.CREATED).json(response(customresponsecode.success,{token:tokenDetails},null))
    } catch (error) {
        if(error.code===mongoErrorCode.duplicateKey){
            return res.status(httpresponsecode.OK).json(response(customresponsecode.duplicate,null,null))
        }
        res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,null))
    }
}

export async function login(req,res){
    try {
        let {email,password} = req.body
        let user = await getUser(email);
        if(!user){
            return res.status(httpresponsecode.OK).json(response(customresponsecode.invalidcredential,null,null))
        }
        let isPasswordmatched = await hashing.comparePassword(password,user.password);
        if(isPasswordmatched){
            let tokenDetails =  tokenService.createToken({id:user.id,email:user.email,role:user.role}, process.env.accessExp,process.env.refreshExp)
            return res.status(httpresponsecode.OK).json(response(customresponsecode.success,{token:tokenDetails},null))
        }else{
            return res.status(httpresponsecode.OK).json(response(customresponsecode.invalidcredential,null,null))
        }
    } catch (error) {
        res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,null))
    }
}



export async function accessToken(req,res){
   try {
    tokenService.newAccessToken(req,res,process.env.accessExp,process.env.refreshExp)
   } catch (error) {
    res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,null))
   }
}