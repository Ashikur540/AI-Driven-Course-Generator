import { userSchema } from "@/lib/validationSchemas";
import { ObjectId, Schema, model, models } from "mongoose";
import { z } from "zod";

export type UserType = z.infer<typeof userSchema> & {
  courses: ObjectId[];
  clerkId: string;
};

const UserSchema = new Schema<UserType>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    courses: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    clerkId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models?.User || model<UserType>("User", UserSchema);

export default User;
