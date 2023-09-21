import { loginurl, signupUrl } from "../utils/datasource"
import { apiPost } from "./apiendpoints"

export const signupAPI = async(requestBody)=>{
    try {
        let response = await apiPost(signupUrl,requestBody);
        return response;
    } catch (error) {
        console.log("the error is in the signup page ", error)
        throw error
    } 
}

export const loginAPI = async(requestBody)=>{
    try {
        let response = await apiPost(loginurl,requestBody);
        return response;
    } catch (error) {
        console.log("the error is in the signup page ", error)
        throw error
    } 
}