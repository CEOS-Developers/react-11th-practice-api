import { Model, Document } from 'mongoose';
import { IUser } from '../interfaces/IUser';

export type UserModel = Model<IUser & Document>;
