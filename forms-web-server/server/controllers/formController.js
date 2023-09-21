import { createForm, deleteForm, formStatistics, getFormId, updateForm, updateView } from '../repo/formRepo';
import customresponsecode from "../configure/responsecode.json"
import httpresponsecode from  "../configure/httpresponsecode.json"
import response from "../configure/response"  

export async function createFormController(req,res){
    try {
        let {sections,userId,title} = req.body;
        let formResult = await createForm({userId,sections,title});
        return res.status(httpresponsecode.CREATED).json(response(customresponsecode.success,null,null))
    } catch (error) {
        console.log("the error is ",error)
        res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,error.message))
    }
}

export async function updateFormController(req,res){
    try {
        let formResult = await updateForm(req.params.id,req.body);
        return res.status(httpresponsecode.CREATED).json(response(customresponsecode.success,null,null))
    } catch (error) {
        console.log("the error is ",error)
        res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,error.message))
    }
}



export async function getForm(req,res){
    try {
        let {id} = req.params;
        let statusCheck = req.query.statusCheck
        let form = await getFormId(id);
        if(!form){
            return res.status(httpresponsecode.OK).json(response(customresponsecode.notFound,null,null))
        }
     if(statusCheck==='true'){
        if(!form.isActive ){
            return res.status(httpresponsecode.NOT_FOUND).json(response(customresponsecode.notacceptingresponses,null,null))
        }
      }
            return res.status(httpresponsecode.OK).json(response(customresponsecode.success,form,null))
       } catch (error) {
            return res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,error.message))
       }
}


export async function getStatistics(req,res){
    try {
        let statistics = await formStatistics(req.user.id)
        return res.status(httpresponsecode.OK).json(response(customresponsecode.success,statistics,null))
    } catch (error) {
        return res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,error.message))
    }
}


export async function incrementViews(req,res){
    try {
       await updateView(req.params.id)
        return res.status(httpresponsecode.OK).json(response(customresponsecode.success,null,null))
    } catch (error) {
        return res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,error.message))
    }
}

export async function deleteFormController(req,res){
    try {
       await deleteForm(req.params.id)
        return res.status(httpresponsecode.OK).json(response(customresponsecode.success,null,null))
    } catch (error) {
        return res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,error.message))
    }
}