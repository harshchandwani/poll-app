import express from 'express';
import { createPoll } from '../controllers/poll.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, createPoll);

export default router;