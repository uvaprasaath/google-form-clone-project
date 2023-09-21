import { Schema, model } from "mongoose";
import QuestionSchema from "./Question";
import Responses from "./Responses";

const FormSchema = new Schema(
    {
      title:{
        type:String
      },
      views:{
        default:0,
        type:Schema.Types.Number
      },
      userId : {
        type: Schema.Types.ObjectId,
        ref : "user",
        required: true,
      },
      isActive : {
        type:Boolean,
        default:true
      },
      sections : [
        {
        title: String,
        description: String,
        questions: {
          type:[QuestionSchema],
        }
    }
]
    },
    {timestamps:true}
)



const Form = model('form',FormSchema)




export default Form;