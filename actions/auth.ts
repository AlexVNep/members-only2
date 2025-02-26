"use server";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import connect from "@/lib/db";
import Member from "@/app/models/Members";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

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

export async function login(provider: string) {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
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

export async function loginWithCreds(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard", // Prevent automatic redirect
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error(
        error.type === "CredentialsSignin"
          ? "Invalid credentials."
          : "Something went wrong."
      );
      return;
    }

    redirect("/");
  }
}
