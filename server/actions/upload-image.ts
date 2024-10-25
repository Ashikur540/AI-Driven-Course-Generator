"use server";

import { auth } from "@clerk/nextjs/server";
//  This function uploads image to imgbb.com and returns the image URL

export const getImageUrl = async (formData: FormData): Promise<string> => {
  try {
    const { userId, redirectToSignIn } = auth();
    if (!userId) {
      redirectToSignIn();
    }

    const file = formData.get("image");
    if (!file) {
      throw new Error("No file provided");
    }

    const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error?.message || "Failed to upload image");
    }

    return data.data.display_url;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to upload image");
    } else {
      throw new Error("Failed to upload image");
    }
  }
};
