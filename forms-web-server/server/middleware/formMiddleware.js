import customresponsecode from "../configure/responsecode.json"
import httpresponsecode from  "../configure/httpresponsecode.json"
import response from "../configure/response"

export function getQuestionFromSections(req,res,next){
    try {
        let sections = [];
        let questionsForSection = [];
         req.body.sections.forEach(({title,description,questions}) => {
            sections.push({title,description});
            questionsForSection.push(questions);
         });
        req.body.questions = questionsForSection;
        req.body.sections = sections;
        next();
    } catch (error) {
        res.status(httpresponsecode.INTERNAL_SERVER_ERROR).json(response(customresponsecode.servererror,null,null))
    }
}