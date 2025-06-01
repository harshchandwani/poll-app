import { Request, Response } from 'express';
import { loginUserService, registerUserService } from '../services/auth.service';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const result = await registerUserService(req.body);

        if (!result.success) {
            return res.status(result.status).json({
                message: result.message || 'Invalid input',
                errors: result.error,
            });
        }

        return res.status(result.status).json({ message: result.message });
    } catch (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};



export const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await loginUserService(req.body);

        if (!result.success) {
            return res.status(result.status).json({
                message: result.message || 'Invalid input',
                errors: result.error,
            });
        }

        return res
            .status(result.status)
            .json({ message: result.message, token: result.token });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};