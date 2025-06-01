import { CreatePollInput } from '../validations/poll.validation';
import { Poll } from '../models/poll.model';

export const createPollService = async (data: CreatePollInput, userId: string) => {
    const formattedOptions = data.options.map((opt) => ({ text: opt, votes: 0 }));

    console.log('reached createPollService with data:', data);
    const poll = new Poll({
        question: data.question,
        options: formattedOptions,
        createdBy: userId,
    });

    await poll.save();


    return poll;
};
