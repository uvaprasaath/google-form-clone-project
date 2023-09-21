import axios from "axios";
import { formUrl, userUrl } from "../utils/datasource"
import { apiGet, apiPost, apiPut } from "./apiendpoints"

export async function addForm(requestBody){
   try {
    console.log("the request body is ",requestBody)
      return await apiPost(formUrl,requestBody);
   } catch (error) {
      throw error
   }
}

export async function updateForm(formId,requestBody){
    try {
     console.log("the request body is ",requestBody)
       return await apiPut(formUrl+`/${formId}`,requestBody);
    } catch (error) {
       throw error
    }
 }

 export async function updateViews(formId){
    try {
       return await apiPut(formUrl+`/${formId}/views`);
    } catch (error) {   
       throw error
    }
 }



export async function getForms(){
    try {
        return await apiGet(userUrl+`/forms`)
    } catch (error) {
        throw error
    }
}


export async function getStatistics(){
    try {
        return await apiGet(formUrl+`/response/statistics`)
    } catch (error) {
        throw error
    }
}


export async function getForm(formId,statusCheck=false){
    try {
        return await apiGet(formUrl+`/${formId}?statusCheck=${statusCheck}`)
    } catch (error) {
        throw error
    }
}


export async function postAnswers(requestBody){
     try{
         return await apiPost(formUrl+'/response',requestBody)
     }catch(error){
        throw error
     }
}


export async function getAnswers(formId){
    try{
        return await apiGet(formUrl+`/response/${formId}`)
    }catch(error){
       throw error
    }
}


export async function getYoutubeVideos(searchText,nextPageToken){
    try{
        return await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchText}&part=snippet&maxResults=10&key=AIzaSyAp_DdEhvW1g2dbKl-nVWru9eh42wkHmQ4`);
    }catch(error){
       throw error
    }
}