import mongoose, { Schema, Document } from "mongoose";

export interface Usertype {
  name: string;
  password: string;
  email: string;
}

const UserSchema: Schema<Usertype> = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User =
  (mongoose.models.User as mongoose.Model<Usertype>) ||
  mongoose.model<Usertype>("User", UserSchema);

export default User;
