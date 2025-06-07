import express from 'express';
import { createPoll, votePoll } from '../controllers/poll.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, createPoll);
router.post('/:pollId/vote', authenticate, votePoll);

export default router;