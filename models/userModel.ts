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
  },
}, { timestamps: true });

// Add a method to check if the document is expired
UserSchema.methods.isExpired = function(): boolean {
  return this.expiresAt < new Date();
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;