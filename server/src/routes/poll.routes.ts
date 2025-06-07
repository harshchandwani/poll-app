import express from 'express';
import { createPoll, getAllPolls, votePoll } from '../controllers/poll.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, createPoll);
router.post('/:pollId/vote', authenticate, votePoll);
router.get('/', authenticate, getAllPolls);

export default router;