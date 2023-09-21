import { User } from '../models'

export async function getUsers(){
    try{
        return await User.find();
    }catch (error) {
        throw error;
    }
}

export async function getUser(email){
    try {
        return await User.findOne({email})
    } catch (error) {
        throw error;
    }
}