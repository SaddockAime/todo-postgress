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

export const disableUser = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  try {
    const user = await userRepo.getSingleUserFx(Number(id));
    if (!user) {
      res.status(404).json({ success: false, message: "User doesn't exist." });
    }
    await userRepo.updateUserStatusFx(Number(id), false);
    res.status(200).json({
      success: true,
      message: "User account disabled successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while disabling the user account."
    });
  }
};

export const enableUser = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  try {
    const user = await userRepo.getSingleUserFx(Number(id));
    if (!user) {
      res.status(404).json({ success: false, message: "User doesn't exist." });
    }
    await userRepo.updateUserStatusFx(Number(id), true);
    res.status(200).json({
      success: true,
      message: "User account enabled successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while enabling the user account."
    });
  }
};



