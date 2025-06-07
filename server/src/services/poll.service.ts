import { CreatePollInput } from '../validations/poll.validation';
import { Poll } from '../models/poll.model';
import { VotePollInput } from '../validations/poll.validation';

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

export const votePollService = async (
    pollId: string,
    input: VotePollInput
) => {
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error('Poll not found');

    const option = poll.options.find(opt => opt.text === input.option);
    if (!option) throw new Error('Option not found in this poll');

    option.votes += 1;
    await poll.save();

    return poll;
};