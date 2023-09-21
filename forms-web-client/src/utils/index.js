import dayjs from "dayjs"
import jwtDecode from "jwt-decode"

export const getToken = ()=>{
    return JSON.parse(localStorage.getItem("token"))
}

export const setToken = (token)=>{
   localStorage.setItem('token', JSON.stringify(token))
}

export const clearStorage = ()=>{
    localStorage.clear();
}


export const QuestionType = {
    SINGLELINE : "sl",
    PARAGRAPH : "ml",
    RADIO: "r",
    CHECKBOX: "c",
    DATE : "d",
    DROPDOWN : "s"
}


export const decodeToken = ()=>{
    let token = getToken();
    let decodedToken;
    try {
        if(token){
            decodedToken = jwtDecode(token.accessToken);
            console.log("the user is ",decodedToken.userDetail)
        }
    } catch (error) {
        throw error
    }
   return decodedToken?.userDetail
}



export function AuthorizationMiddleware(roles){
    return (role)=>{
        if(roles.includes(role)){
          return true;
        }
      return false
    }
  }
  

 export function formatTimeDifference(dateString) {
    const now = new Date();
    const inputDate = new Date(dateString);
  
    const timeDifferenceInSeconds = Math.floor((now - inputDate) / 1000);
  
    if (timeDifferenceInSeconds < 60) {
      return 'just now';
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else  if(timeDifferenceInSeconds < 2592000){
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = inputDate.toLocaleDateString(undefined, options);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }

export  const formattedDate = (data) => dayjs(data).format('MM-DD-YYYY');

export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = new Date(dayjs(dateString).format('YYYY-MM-DD')).toLocaleDateString(undefined, options);
  return formattedDate;
}


