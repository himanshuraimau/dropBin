import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  url: string;
  text: string;
  expiresAt: Date;
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
  expiresAt: {
    type: Date,
    required: true,
    index: true // Add an index for better query performance
  }
}, { timestamps: true });

// Add a method to check if the document is expired
UserSchema.methods.isExpired = function(): boolean {
  return this.expiresAt < new Date();
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;