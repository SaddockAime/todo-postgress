import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { comparePassword, encryptPassword, generateToken } from '../../../helpers'
import userRepo from '../repository/todoUserRepo'


interface ExtendedRequest extends Request {
    userId?: string;
}


// Login
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        const user = await userRepo.getUserByEmail(req.body.email);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No user found with the provided email',
            });
        }

        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            return res.status(404).json({
                status: 'fail',
                message: 'Incorrect password',
            });
        }

        const token = generateToken(user.id);

        return res.status(200).json({
            status: 'success',
            data: {
                user,
                token,
            },
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            code: error.code,
        });
    }
};

// Signup
export const signup = async (req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await userRepo.getUserByEmail(req.body.email);
        if (existingUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User already exists',
            });
        }

        const hashedPassword = await encryptPassword(password);
        req.body.password =  hashedPassword;
        const newUser = await userRepo.createUser(req.body)
        // const newUser = await createUser({
        //     username,
        //     email,
        //     password: hashedPassword,
        // });

        return res.status(200).json({
            status: 'success',
            data: newUser,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            code: error.code,
        });
    }
};

// View all users
export const viewUsers = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        
        console.log(req.userId)
        const allUsers = await userRepo.getUsers();
        return res.status(200).json({
            message: 'All users retrieved successfully',
            data: allUsers,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            code: error.code,
        });
    }
};



