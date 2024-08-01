import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { signInSchema } from "./schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const { email, password } = await signInSchema.parseAsync(credentials);

        // user = await getUserFromDb(email, passwordHash)
        user = { email, password };

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        return user;
      },
    }),
  ],
});
