import mongoose from "mongoose";
import { Responses } from "../models";

export async function addFormResponse({userId,sections,formId}){
    try {
        let newResponse = new Responses({
            userId,sections,formId
        })
        return await newResponse.save();
    } catch (error) {
        throw error
    }
}

export async function getResponsesByFormId(formId){
    try {
       let formResponses = await Responses.find({formId});
       console.log("the formResponses ",formResponses)
      let updatedForm = [];
       formResponses?.forEach((response,index)=>{
        let sectionResponse = {};
        response.sections.forEach((section,sectionIndex)=>{
          sectionResponse[`${section.sectionId}`] = {};
          section.responses.forEach((question)=>{
            console.log("the questoi0o is ",question);
              sectionResponse[`${section.sectionId}`][`${question.questionId}`] = question.response;
          })
        })
        updatedForm.push({_id:formResponses[index]._id,formId:formResponses[index].formId,sections:sectionResponse})
       })
      console.log("the response is what ",formResponses);
      return updatedForm;
    } catch (error) {
        throw error
    }
}


