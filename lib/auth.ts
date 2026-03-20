import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

// types/auth.ts
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  TEACHER = "teacher",
  PARENT = "parent",
  SCHOOL = "school",
  SUPER_ADMIN = "super_admin",
}

export type UserRoleType = keyof typeof UserRole;

const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db();

async function isFirstUser(): Promise<boolean> {
  try {
    const count = await db.collection("user").countDocuments();
    return count === 0;
  } catch (error) {
    return true;
  }
}

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

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const firstUser = await isFirstUser();

          if (firstUser) {
            console.log("🎉 First user detected! Creating as SUPER_ADMIN");

            return {
              data: {
                role: UserRole.SUPER_ADMIN,
                accountType: "admin",
              },
            };
          }

          // 👇 do nothing for other users
          return;
        },

        after: async (user) => {
          console.log("user who was created", user);
        },
      },
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
      },

      accountType: {
        type: "string",
        required: false,
      },

      // Teacher fields
      tscNumber: { type: "string", required: false },
      subjects: { type: "string", required: false },
      experience: { type: "string", required: false },
      qualifications: { type: "string", required: false },

      // School fields
      institutionName: { type: "string", required: false },
      institutionType: { type: "string", required: false },
      country: { type: "string", required: false },
      state: { type: "string", required: false },
      city: { type: "string", required: false },
      customCity: { type: "string", required: false },
      latitude: { type: "string", required: false },
      longitude: { type: "string", required: false },
    },
  },

  plugins: [admin(), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
