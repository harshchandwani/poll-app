import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/auth.controllers';

const router = Router();

// POST /api/auth/register
router.post('/register', (req, res, next) => {
    registerUser(req, res).catch(next);
});

// POST /api/auth/login
router.post('/login', (req, res, next) => {
    loginUser(req, res).catch(next);
});

export default router;