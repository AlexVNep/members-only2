"use server";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import connect from "@/lib/db";
import Member from "@/app/models/Members";
import { z } from "zod";
import bcrypt from "bcryptjs";
import Post from "@/app/models/Post";

export async function getUserByEmail(email: string) {
  try {
    connect();
    const user = await Member.findOne({ email });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/sign-in" });
  revalidatePath("/");
}

type RegisterResponse = { success: true } | { error: string };

export async function RegisterWithCreds(
  formData: FormData
): Promise<RegisterResponse> {
  const registerFormSchema = z.object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    username: z.string().trim(),
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z.string().trim(),
  });

  const validatedFields = registerFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.error(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return { error: "Not validated" };
  }

  const { firstName, lastName, username, email, password } =
    validatedFields.data;

  const existingUser = await Member.findOne({ email });
  if (existingUser) {
    console.error("Email already in use");
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await Member.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}

// type LoginResponse = { error?: string };

export async function loginWithCreds(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // Prevent automatic redirect
    });

    if (!response || response.error) {
      console.error("Invalid credentials.");
      return { error: "Invalid credentials." };
    }

    return { sucess: true }; // Success case, return an empty object
  } catch (error) {
    console.error("Something went wrong.", error);
    return { error: "Something went wrong. Please try again later." };
  }
}

type createPostResponse = { success: true } | { error: string };

export async function createPost(
  formData: FormData
): Promise<createPostResponse> {
  const postFormSchema = z.object({
    title: z.string().trim(),
    message: z.string().trim(),
    createdBy: z.string().trim(),
  });

  const validatedFields = postFormSchema.safeParse({
    title: formData.get("title"),
    message: formData.get("message"),
    createdBy: formData.get("createdBy"),
  });

  if (!validatedFields.success) {
    console.error(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return { error: "Not validated" };
  }

  const { title, message, createdBy } = validatedFields.data;

  await connect();

  try {
    await Post.create({
      title,
      message,
      createdBy,
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
