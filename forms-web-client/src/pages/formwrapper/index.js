import { useForm } from "react-hook-form";
import { QuestionType } from "../../utils";

export function FormWrapper({Component,questions,forms,currentIndex,props}){
    function generateFormHook(){
        let defaultValues = {};
        questions.forEach((question)=>{
         if(question.type===QuestionType.CHECKBOX){
           defaultValues[`${question._id}`] = [];
         }else{
          defaultValues[`${question._id}`] = "";
         }
        })
        return defaultValues;
     } 
    
    let form = useForm(forms.current[currentIndex] ? {defaultValues:{
        ...forms.current[currentIndex]
     }} :{
       defaultValues: {
        ...generateFormHook()
       }
     });

     let FormWrappedComponet = (props)=>{
        return <Component  {...{...props,formObject:form}}/>
     }

     return <Component  {...{...props,formObject:form}}/>;
}