import { Form, Responses } from "../models";
import mongoose from "mongoose"

export async function createForm({userId,sections,title}){
    try {
        let newForm = new Form({
             userId ,
             sections,
             title
        })
        return await newForm.save();
    } catch (error) {
        throw error
    }
}


export async function getFormByUserId(userId){
    try {
        return await Form.find({userId},"_id title createdAt updatedAt isActive views")
    } catch (error) {
        throw error;
    }
}

export async function getFormId(id){
    try {
        return await Form.findById(id)
    } catch (error) {
        throw error;
    }
}


export async function updateForm(id,updatedBody){
    try {
        return await Form.findByIdAndUpdate(id,updatedBody)
    } catch (error) {
        throw error
    }
}

export async function formStatistics(userId){
  console.log("the rdsres jdbuhrjf statisctic ",userId)
  try {
    const aggregationPipeline = [
        {
          $match: { userId : mongoose.Types.ObjectId(userId)},
        },
        {
          $lookup: {
            from: 'responses', 
            localField: '_id',
            foreignField: 'formId',
            as: 'responses',
          },
        },
        {
            $project: {
              _id: 1,
              formId: '$_id',
              responseCount: { $size: '$responses' },
            },
          },{
            $group :{
                _id: null, 
                totalResponseCount: { $sum: '$responseCount' },
            }
          }
      ];

      const aggregationPipelineForForm = [
        {
            $match: { userId : mongoose.Types.ObjectId(userId)},
          },
          {
            $group :{
                _id: null, 
                totalViews: { $sum: '$views' },
            }
          }
      ]
      let allViews = await Form.aggregate(aggregationPipelineForForm);
      let totalSubmission = await Form.aggregate(aggregationPipeline);
      console.log("the total submission is ",totalSubmission)
      let statistics = {};
      statistics["totalViews"] = allViews[0].totalViews;
      let allSubmission = totalSubmission[0].totalResponseCount
      statistics["trend"] = Math.ceil((allSubmission/statistics.totalViews)*100);
     return statistics;
  } catch (error) {
    throw error;
  }
}


export async function updateView(formId){
    try {
        return await Form.updateOne({_id:formId},{$inc:{views:1}})
    } catch (error) {
        throw error;
    }
}