import { Request, Response } from 'express';
import { createPollSchema, votePollSchema } from '../validations/poll.validation';
import { createPollService, votePollService } from '../services/poll.service';
import { AuthenticationRequest } from '../middleware/auth.middleware';

export const createPoll = async (req: AuthenticationRequest, res: Response) => {
    const parsed = createPollSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    }

    const poll = await createPollService(parsed.data, req.user!.userId);

    return res.status(201).json({ message: 'Poll created successfully', poll });
};

export const votePoll = async (req: AuthenticationRequest, res: Response) => {
    const parsed = votePollSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    }

    try {
        const poll = await votePollService(req.params.pollId, parsed.data);
        return res.status(200).json({ message: 'Vote submitted', poll });
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};
