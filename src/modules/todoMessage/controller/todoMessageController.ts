import { Request, Response } from "express";
import express from 'express';
import todoRepo from '../repository/todoMessageRepo'
import userRepo from '../repository/todoMessageRepo'

interface ExtendedRequest extends Request {
    userId?: string;
  }
//messages
export const createMessage = async (req:ExtendedRequest, res: express.Response):Promise<void> => {
    //console.log("hello")
    try {
        const userId = req.userId;
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;

        if (!userId) {
            res.status(400).json({
                message: "User ID is required"
            });
            return; // Ensure function execution stops here
        }

        // Get the user by ID
        const user = await userRepo.getSingleUserFx(Number(userId));
        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return; // Ensure function execution stops here
        }

        // Check if the user is disabled
        if (!user.status) {
            res.status(403).json({
                message: "User account is disabled"
            });
            return; // Ensure function execution stops here
        }

        const newMessage = await todoRepo.createTodo({userId, name, email, message})
        res.status(200).json({
            message: "Message Sent",
            data: newMessage
        })
    } catch(error: any) {
        res.status(500).json({
            message: error.message,
            code: error.code,             
        })
    }
}


//view all messages
export const viewMessages = async (req: express.Request, res: express.Response):Promise<void> => {
    try {
        const allMessages = await todoRepo.getAllTodo()
        
        if(! allMessages){
            res.status(404).json({
                message: "messages were not found"
            })
        }
        res.status(200).json({
            message: "All Messages successfully found",
            data: allMessages
        })
    }
    catch(error: any){
        res.status(500).json({
            message: error.message,
            code: error.code,             
        })
    }
}


// // Update message
// export const updateMessage = async (req:ExtendedRequest, res: express.Response):Promise<void> => {
//     try {
//         const userId = req.userId;
//         const todoId = req.params.id;
//         const name = req.body.name;
//         const email = req.body.email;
//         const message = req.body.message;

//         const updatedMessage = await todoRepo.updateTodo(userId, todoId, name, email, message);

//         if (!updatedMessage) {
//             res.status(404).json({
//                 message: `Message with ${userId}} is not found.`,
//             });
//         }

//         res.status(200).json({
//             message: 'Message edited successfully',
//             data: updatedMessage,
//         });
//     } catch (error: any) {
//         res.status(500).json({
//             message: error.message,
//             code: error.code,
//         });
//     }
// };

export const getTodoByUser = async(req:ExtendedRequest, res:Response):Promise<void> => {
    const userId = req.userId;
    const todo = await todoRepo.getTodoByUserId(userId);

    res.status(200).json({
        message: 'successfully',
        data: todo,
    });
}


//delete message
export const deleteMessage = async (req:ExtendedRequest, res: express.Response):Promise<void> => {
    try {
        const userId = req.userId;
        const existingMessage = await todoRepo.getTodoByUserId(userId);
        if (!existingMessage) {
            res.status(404).json({
                message: "Message not found"
            });
        }
        // Delete the message
        const todoId = req.params.id;
        const deletedMessage = await todoRepo.deleteTodo({userId, todoId});
        res.status(200).json({
            message: "Message deleted successfully",
            data: deletedMessage
        });
    } 
    catch (error: any) {
        res.status(500).json({
            message: error.message,
            code: error.code
        });
    }
}

