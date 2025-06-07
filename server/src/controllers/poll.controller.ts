import { Request, Response } from 'express';
import { createPollSchema, votePollSchema } from '../validations/poll.validation';
import { createPollService, getAllPollsService, votePollService } from '../services/poll.service';
import { AuthenticationRequest } from '../middleware/auth.middleware';

// Controller to create a new poll
// This function validates the request body using the createPollSchema and then calls the service to create a poll.
export const createPoll = async (req: AuthenticationRequest, res: Response) => {
    const parsed = createPollSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    }

    const poll = await createPollService(parsed.data, req.user!.userId);

    return res.status(201).json({ message: 'Poll created successfully', poll });
};

// Controller to handle voting in a poll
// This function validates the request body using the votePollSchema and then calls the service to register the vote.
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

// Controller to get all polls
// This function retrieves all polls from the service and returns them in the response.
export const getAllPolls = async (req: AuthenticationRequest, res: Response) => {
    try {
        const polls = await getAllPollsService();
        return res.status(200).json(polls);
    }
    catch (err: any) {
        console.error('Error fetching polls:', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}