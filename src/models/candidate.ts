import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

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

export default mongoose.model<IUser & mongoose.Document>('Candidate', Candidate);
