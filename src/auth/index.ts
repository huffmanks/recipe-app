import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import db from "@/db";
import env from "@/env";
import { signInSchema } from "./schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },

      authorize: async (credentials) => {
        let user = null;

        const { username, password } = await signInSchema.parseAsync(credentials);

        // user = {username, password}

        user = await db.query.users.findFirst();

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If user is available (sign in)
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.name = `${user.firstName} ${user.lastName}`;
        token.picture = user.image;
      }

      // If you need to customize the token further here
      // Example: add custom claims or modify existing ones
      return token;
    },
    async session({ session, token }) {
      // Attach additional properties from the token to the session
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.image = token.picture;
        // Attach any other properties you want to the session object
      }
      return session;
    },
  },
  secret: env.AUTH_SECRET,
});
