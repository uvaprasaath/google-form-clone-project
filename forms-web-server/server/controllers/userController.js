import { getUsers } from '../repo/userRepo';
import { getFormByUserId } from '../repo/formRepo';
import customresponsecode from "../configure/responsecode.json"
import httpresponsecode from  "../configure/httpresponsecode.json"
import response from "../configure/response"  



export async function getAllFormForUser(req,res){
  try {
   let {id} = req.user;
   console.log("the user id is ",id);
   let forms = await getFormByUserId(id);
   if(!forms || !forms?.length){
    return res.status(httpresponsecode.OK).json(response(customresponsecode.notFound,null,null))
   }
   return res.status(httpresponsecode.OK).json(response(customresponsecode.success,forms,null))
  } catch (error) {
   res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,error.message))
  }
} 




