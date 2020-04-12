import mongoose from 'mongoose';
import { ICandidate } from '../interfaces';

const Candidate = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },

    voteCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ICandidate & mongoose.Document>('Candidate', Candidate);
