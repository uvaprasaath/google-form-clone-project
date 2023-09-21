import { genSalt, hash as _hash, compare } from 'bcrypt';
const saltRounds = 10; // The number of salt rounds determines the complexity of the hash


async function encryptPassword(password){
    // let salt = 'thisissalt';
    let hashedPassword;
    let promise = new Promise((resolve,reject)=>{
        genSalt(saltRounds, (err, salt) => {
            if (err) {
               reject(err);
            }
          
            _hash(password, salt, (err, hash) => {
              if (err) {
                reject(err);
              }
          
              // Now you can save the 'hash' in your database along with the user's information
              console.log('Hashed Password:', hash);
              hashedPassword = hash;
              resolve(hashedPassword)
            });
          });
    })
      return promise
}



function comparePassword(password,storedHash){
    let isMatched = false;
    let promise = new Promise((resolve,reject)=>{
        compare(password, storedHash, (err, result) => {
            if (err) {
                reject(err);
            }
          
            if (result) {
              // Passwords match
              console.log('Password is correct');
              isMatched = true;
            } else {
              // Passwords do not match
              console.log('Password is incorrect');
            }
            resolve(isMatched)
          });
    })
   
     return promise; 
}


export default {
    comparePassword,
    encryptPassword
}
