import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import User, { UserType } from "@/server/model/user.modal";
import connectToDB from "@/lib/dbconnect";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const { id, email_addresses, first_name, last_name, image_url } =
    evt.data as UserJSON;
  const eventType = evt.type;

  // if new user created then we save it to our database
  try {
    if (eventType === "user.created") {
      console.log("User created", id);
      await connectToDB();
      const user = await User.create({
        email: email_addresses[0].email_address,
        fullName: `${first_name ?? ""} ${last_name ?? ""}`,
        imageURL: image_url ?? "",
        role: "user",
        clerkId: id,
        courses: [],
      } as UserType);
      console.log("User created", user);
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }

  return new Response("", { status: 200 });
}
