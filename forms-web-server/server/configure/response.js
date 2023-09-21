function response(code,result, err){
   return {
       header : {
           code : code
       },
       body :{
           value : result ,
           error : err
       }
   }
}

export default response
