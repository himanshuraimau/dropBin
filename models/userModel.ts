import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  url: string;
  text: string;
}

const UserSchema = new mongoose.Schema<IUser>({
   url: {
      type: String,
      required: true,
      unique: true
   },
   text: {
      type: String,
      required: true,
   }
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
