import mongoose, { Schema, Document } from 'mongoose';

// Define a TypeScript interface for the Poll document
export interface Option {
    text: string;
    votes: number;
}

// Create the Mongoose schema for the Poll
export interface PollDocument extends Document {
    question: string;
    options: Option[];
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
}

// Create the Mongoose schema for the Option
const optionSchema = new Schema<Option>(
    {
        text: { type: String, required: true },
        votes: { type: Number, default: 0 },
    },
    { _id: false }
);

// Create the Mongoose schema for the Poll
const pollSchema = new Schema<PollDocument>(
    {
        question: { type: String, required: true },
        options: {
            type: [optionSchema],
            required: true,
            validate: {
                validator: function (v: Option[]) {
                    return v.length >= 2;
                },
                message: 'A poll must have at least two options.'
            }
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);


export const Poll = mongoose.model<PollDocument>('Poll', pollSchema);