import { Request, Response } from 'express';
import { createPollSchema } from '../validations/poll.validation';
import { createPollService } from '../services/poll.service';
import { AuthenticationRequest } from '../middleware/auth.middleware';

export const createPoll = async (req: AuthenticationRequest, res: Response) => {
    const parsed = createPollSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    }

    const poll = await createPollService(parsed.data, req.user!.userId);

    return res.status(201).json({ message: 'Poll created successfully', poll });
};
