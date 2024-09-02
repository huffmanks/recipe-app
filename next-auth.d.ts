// types/next-auth.d.ts

import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    image: string;
    role: "admin" | "member" | "guest";
  }

  interface Session {
    user: {
      id: string;
      username: string;
      name: string;
      image: string;
      role: "admin" | "member" | "guest";
    } & DefaultUser;
  }
}
