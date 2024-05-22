import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
interface ExtendedRequest extends Request {
    userId?: string;
}

export const authentication = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({status: false, message: "You are not logged in."});
    }

    const JWT_KEY: Secret | undefined = process.env.JWT_KEY || 'SECRET';
    if (!JWT_KEY) {
        // console.log('JWT secret is not defined');
        return res.status(500).json({ error: 'JWT secret is not defined' });
    }

    jwt.verify(token, JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({status: false, message: "You are not logged in. Invalid Token."});
        }else {
            const userId = (decoded as any).userId;
            if (!userId) {
                console.log('User ID not found in token');
                return res.status(401).json({ error: 'User ID not found in token' });
            }
            req.userId = userId;
            // console.log(userId)
            next();
        }
        // (req as any).userId = (decoded as any).userId;
        // next();
    });
};