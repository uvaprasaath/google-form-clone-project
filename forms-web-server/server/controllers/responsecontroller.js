import { addFormResponse, getResponsesByFormId, getResponsesByFormId2 } from "../repo/responserepo";
import customresponsecode from "../configure/responsecode.json"
import httpresponsecode from  "../configure/httpresponsecode.json"
import response from "../configure/response"  
import { getFormId } from "../repo/formRepo";

export async function addFormResponseController(req,res){
    try {
        let {userId,sections,formId} = req.body;
        let result = await addFormResponse({userId,sections,formId});
        return res.status(httpresponsecode.CREATED).json(response(customresponsecode.success,null,null))
    } catch (error) {
       return res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,error.message))
    }
}


export async function getAllResponses(req,res){
    try {
        let formId = req.params.id;
        let responses =  await getResponsesByFormId(formId);
        
        return res.status(httpresponsecode.OK).json(response(customresponsecode.success,responses,null))
    } catch (error) {
        console.log(error)
        return res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,error.message))
    }
}

export async function getAllResponses2(req,res){
    try {
        let formId = req.params.id;
        let responses =  await getResponsesByFormId(formId);
       
        return res.status(httpresponsecode.OK).json(response(customresponsecode.success,responses,null))
    } catch (error) {
        console.log(error)
        return res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,error.message))
    }
}