import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Member from "./app/models/Members";
import connect from "./lib/db";
// import { redirect } from "next/navigation";
import { z } from "zod";

async function getUser(email: string) {
  await connect();
  try {
    const user = await Member.findOne({ email }).exec();
    return user || undefined;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});

// if (!user) {
//   // If the user does not exist, create one
//   const hashedPassword = await bcrypt.hash(password, 10);
//   user = await Member.create({
//     firstName: fname,
//     lastName: lname,
//     username,
//     email,
//     password: hashedPassword,
//   });
// } else {
//   // Compare the entered password with the stored hashed password
//   const isMatch = await bcrypt.compare(
//     password,
//     user.password as string
//   );
//   if (!isMatch) {
//     throw new Error("Incorrect password.");
//   }
// }

// return user;
