// import User from "../../../database/models/userSchema";


// const createUser = async (body: any) => {
//     return await User.create(body);
// }

// const getAllUsers = async () => {
//     return await User.findAll()
// }

// const findUserByEmail = async (email: string) => {
//     return await User.findOne({email});
// }

// const findUserById = async (id: string) => {
//     return await User.findOne({_id: id});
// }

// const deleteUserById = async (id: string) => {
//     return await User.deleteOne({_id: id});
// }

// const editUserByUsername = async (id: string, username: string) => {
//     return await User.findByIdAndUpdate({_id: id},{username})
// }

// export {
//     createUser,
//     findUserByEmail,
//     deleteUserById,
//     editUserByUsername,
//     getAllUsers,
//     findUserById
// }


import db from '../../../database/models/index';

const { User } = db;

const getUsers = async() => {
    const users = await User.findAll();
    return users;
}



const createUser = async (body: any) => {
    try {
        const user = await User.create(body);
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
const getUserByEmail = async(email:string) => {
    const user = await User.findOne({where: { email }});
    return user;
}

export default {createUser,getUsers,getUserByEmail}