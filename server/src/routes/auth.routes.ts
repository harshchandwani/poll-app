import { Router } from 'express';
import { registerUser } from '../controllers/auth.controllers';

const router = Router();

// POST /api/auth/register
router.post('/register', (req, res, next) => {
    registerUser(req, res).catch(next);
});

export default router;