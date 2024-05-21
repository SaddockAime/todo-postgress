// import Message from '../../../database/models/todomessage'


// const createMessages = async (body: any) => {
//     return await Message.create(body);
// }

// const getAllMessages = async () => {
//     return await Message.find()
// }

// const getMessageById = async (id: string) => {
//     return await Message.findOne({_id: id});
// }

// const editMessageById = async (id: string, name: string, email: string, message: string) => {
//     return await Message.findByIdAndUpdate({_id: id},{name, email, message});
// }

// const deleteMessageById = async (id: string) => {
//     return await Message.deleteOne({_id: id});
// }

// export { createMessages, getAllMessages, getMessageById, deleteMessageById, editMessageById }

import db from '../../../database/models/index';

const { Todo,Users } = db;

const getAllTodo = async () => {
    const todo = await Todo.findAll({
        include: [
            {
                model: Users,
                as: 'User',
                attributes: ['id', 'username', 'email'],
            },
        ],
    });
    return todo;
};

const createTodo = async (body: any) => {
    const todo = await Todo.create({
        name: body.name,
        email: body.email,
        message: body.message,
        user_id: body.userId,
    });
    const todoWithUser = await Todo.findOne({
        where: { id: todo.id },
        include: [
            {
                model: Users,
                as: 'User',
                attributes: ['id', 'username', 'email'],
            },
        ],
    });

    return todoWithUser;
};

const deleteTodo = async (body:any) => {
    const todo =  await Todo.destroy({where: {id: body.todoId, user_id: body.userId}})
    return todo;
};

const updateTodo = async (body: any) => {
    await Todo.update(
        { 
            name: body.name, 
            email: body.email, 
            message: body.message
        },  
        {
            where: { id: body.todoId, user_id: body.userId },
            returning: true,  
            plain: true,    
        }
    );
    const updatedTodo = await Todo.findOne({
        where: { id: body.todoId },
        include: [
            {
                model: Users,
                as: 'User',
                attributes: ['id', 'username', 'email'],
            },
        ],
    });

    return updatedTodo;
};

const getTodoByUserId = async (userId:any) => {
    const todo = await Todo.findAll({
        where: { user_id: userId },
        include: [
            {
                model: Users,
                as: 'User',
                attributes: ['id', 'username', 'email'],  
            },
        ],
    });
    return todo;
}

export default { getAllTodo, createTodo, deleteTodo, updateTodo,getTodoByUserId}