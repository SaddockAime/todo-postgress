import db from '../../../database/models/index';

const { Todo,User } = db;

const getAllTodo = async () => {
    const todo = await Todo.findAll({
        include: [
            {
                model: User,
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
                model: User,
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
                model: User,
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
                model: User,
                as: 'User',
                attributes: ['id', 'username', 'email'],  
            },
        ],
    });
    return todo;
}

// Function to get single user
const getSingleUserFx = async (id: number) => {
    return await User.findOne({
      where: { id }
    });
  };

export default { 
    getAllTodo, 
    createTodo, 
    deleteTodo, 
    updateTodo, 
    getTodoByUserId,
    getSingleUserFx
}