import { CreatePollInput } from '../validations/poll.validation';
import { Poll } from '../models/poll.model';
import { VotePollInput } from '../validations/poll.validation';

// Service to create a new poll
// This function takes a CreatePollInput object and the user ID of the creator.
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

// Service to handle voting in a poll
// This function takes a poll ID and an input object containing the option to vote for.
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

// Service to get all polls
// This function retrieves all polls from the database, sorted by creation date in descending order.
export const getAllPollsService = async () => {
    const polls = await Poll.find()
        .sort({ createdAt: -1 }) // recent first
        .populate('createdBy', 'email'); // optional: return creator's email

    return polls;
};