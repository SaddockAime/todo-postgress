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