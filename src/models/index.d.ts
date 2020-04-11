import { Model, Document } from 'mongoose';
import { IUser, ICandidate } from '../interfaces';

export type UserModel = Model<IUser & Document>;

export type CandidateModel = Model<ICandidate & Document>;
