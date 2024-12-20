import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDB = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "ai-course-generator",
      bufferCommands: true,
    });
    console.log("Connected to MongoDB");
  } catch (err: unknown) {
    console.log("Error: ", err);
    throw new Error("Error: ", err as ErrorOptions);
  }
};

export default connectToDB;
