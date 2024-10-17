import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },

});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;