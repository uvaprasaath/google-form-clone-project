import { User } from "../models";

export async function signUpRepo(name,email,password){
    try {
        const newUser = new User({name,email,password});
        return await newUser.save();
    } catch (error) {
        throw error
    }
}