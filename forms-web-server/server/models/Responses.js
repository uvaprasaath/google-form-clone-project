import {Schema, model} from "mongoose";




// const ResponseSchema = new Schema({
//         userId : {
//             type : String
//         },
//         formId:{
//             type: Schema.Types.ObjectId,
//             ref : "form",
//             required : true
//         },
//         sections :
//         {
//                         type : Schema.Types.Mixed
//                     }
//         //  [
//         //     {
//         //         sectionId : {
//         //             type: String
//         //         },
//         //         responses : {
//         //             type : Schema.Types.Mixed
//         //         }
//         //     }
//         // ]
// },{
//     timestamps:true
// }
// )



const AnswerSchema = new Schema({
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "question"
    },
    response: {
      type: Schema.Types.Mixed
    }
  });
  const ResponseSchema = new Schema({
    userId: {
      type: String,
    },
    formId:{
                    type: Schema.Types.ObjectId,
                    ref : "form",
                    required : true
                },
    sections: [{
      sectionId: {
        type: String
      },
      responses: {
        type: [AnswerSchema]
      }
    }]}
    ,{
        timestamps:true
    }
    )
  

const Responses = model("responses",ResponseSchema)

export default Responses;