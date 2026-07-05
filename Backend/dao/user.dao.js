import User from "../models/user.model.js";

export const findById = async(id) =>{
    const user = await User.findById({_id: id}).select("-password");
    return user;
}

export const findUserByEmail = async(email) =>{
    const user = await User.findOne({email});
    return user;
}

export const createUser = async(userObject) =>{
    const newUser = await User.create(userObject);
    return newUser;
}