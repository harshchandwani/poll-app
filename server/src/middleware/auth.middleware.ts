import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware to authenticate user requests
// This middleware checks if the user is authenticated by verifying the JWT token
export interface AuthenticationRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}

export const authenticate = (
    req: AuthenticationRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            userId: string;
            email: string;
        };

        req.user = decoded;

        next();
    }
    catch (err) {
        console.error('Authentication error:', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
}