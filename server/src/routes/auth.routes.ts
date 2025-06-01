import { NextFunction, Router } from 'express';
import { loginUser, registerUser } from '../controllers/auth.controllers';
import { authenticate, AuthenticationRequest } from '../middleware/auth.middleware';

const router = Router();

// POST /api/auth/register
router.post('/register', (req, res, next) => {
    registerUser(req, res).catch(next);
});

// POST /api/auth/login
router.post('/login', (req, res, next) => {
    loginUser(req, res).catch(next);
});

// Example protected route
router.get('/me', authenticate, (req: AuthenticationRequest, res: any, next: NextFunction) => {
    res.json({
        message: 'You are authenticated',
        user: req.user,
    });
});

export default router;