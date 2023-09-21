import { Schema, model } from "mongoose";

const QuestionSchema = new Schema(
    {
        text : {
            type : String,
            required : true,
            min : 3,
        },
        description:{
           type : String
        },
        video:{
            type: Schema.Types.Mixed
        },
        isQuestion: {
            type : Boolean,
            default:true
        },
        type : {
            type: String,
        },
        options:[{
            type:String
        }],
        isRequired :{
            type : Boolean,
            default:false
        },
    }
)

export default QuestionSchema

// const Question = model('question',QuestionSchema)

// export default Question;