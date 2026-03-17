// types/user.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  banned: boolean | null;
  banReason?: string | null;
  banExpires?: Date | null;
}

// Role enum
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
  EDITOR = "editor",
  SUPER_ADMIN = "super_admin",
}

// Optional: Type for user without sensitive/optional fields
export type SafeUser = Omit<User, "banReason" | "banExpires">;
