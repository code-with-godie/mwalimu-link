import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
// types/auth.ts
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
  EDITOR = "editor",
  VIEWER = "viewer",
  SUPER_ADMIN = "super_admin",
}

export type UserRoleType = keyof typeof UserRole;
const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db();
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    github: {
      prompt: "select_account",
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      prompt: "select_account",
      clientId: process.env.BETTER_GOOGLE_ID as string,
      clientSecret: process.env.BETTER_GOOGLE_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        default: UserRole.USER, // Use enum value
        validate: (value: string) => {
          return Object.values(UserRole).includes(value as UserRole);
        },
        avatar: {
          public_id: { type: "string", required: false },
          url: { type: "string", required: false },
        },
      },
    },
  },
  plugins: [admin(), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
