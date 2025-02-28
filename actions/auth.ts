"use server";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import connect from "@/lib/db";
import User from "@/app/models/Members";
import { z } from "zod";
import bcrypt from "bcryptjs";
import Post, { IPost } from "@/app/models/Post";

export async function getUserByEmail(email: string) {
  try {
    connect();
    const user = await User.findOne({ email });
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

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.error("Email already in use");
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
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

export async function getPosts(): Promise<IPost[]> {
  try {
    console.log("Fetching posts");
    const data = await Post.find({}).lean();
    // Convert ObjectId to string
    const posts = data.map((post) => ({
      ...post,
      _id: post._id.toString(), // Convert ObjectId to string
    }));

    console.log("Posts fetched", posts);
    return posts;
  } catch (error) {
    console.error("Error fetching decisions:", error);
    return [];
  }
}

export async function updateMembership(userEmail: string) {
  try {
    await connect();
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    user.membership = true; // Update membership status
    await user.save(); // Save the updated user

    return { success: true, message: "Membership updated successfully!" };
  } catch (error) {
    console.error("Error updating membership", error);
    return { success: false, message: "Failed to update membership" };
  }
}

export async function updateAdminRoll(userEmail: string) {
  try {
    await connect(); // Ensure DB connection
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    user.admin = true; // Update membership status
    await user.save(); // Save the updated user

    return { success: true, message: "Membership updated successfully!" };
  } catch (error) {
    console.error("Error updating admin status", error);
    return { success: false, message: "Failed to update admin status" };
  }
}

export async function deletePost(postId: string) {
  try {
    await connect(); // Ensure DB connection
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return { success: false, message: "Post not found" };
    }

    return { success: true, message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, message: "Failed to delete post" };
  }
}
