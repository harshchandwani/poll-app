import { Request, Response } from 'express';
import { registerUserService } from '../services/auth.service';

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
