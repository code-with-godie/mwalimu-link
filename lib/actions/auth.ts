"use server";

import { LoginFormData, SignupFormData } from "@/schema/auth";
import { auth } from "../auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { User, UserRole } from "@/typing";

export async function signInWithCredentials(data: LoginFormData) {
  const result = await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password,
      callbackURL: "/",
    },
  });
  console.log("results", result);

  return result;
}
export async function signUp(data: SignupFormData) {
  const result = await auth.api.signUpEmail({
    body: {
      name: data.name, // required
      email: data.email, // required
      password: data.password, // required
      callbackURL: "/sign-in", // optional
    },
  });
  return result;
}
export async function signinWithSocial(provider: "github" | "google") {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
    },
  });
  if (url) {
    redirect(url);
  }
}
export async function adminCreateUser(data: SignupFormData) {
  await auth.api.createUser({
    body: {
      email: data.email, // required
      password: data.password, // required
      name: data.name, // required
      role: "user",
    },
  });
  // revalidateTag("users", { type: "layout" });
}
export async function listAllUsers(): Promise<User[]> {
  const session = await auth.api.getSession({
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  const users = await auth.api.listUsers({
    query: {
      filterField: "id",
      filterOperator: "ne",
      filterValue: session?.user.id || "",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  return users.users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    emailVerified: user.emailVerified,
    image: user.image,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    role: user.role as UserRole,
    banned: user.banned,
    banReason: user.banReason,
    banExpires: user.banExpires,
  }));
}
export async function makAdmin() {
  const session = await auth.api.getSession({
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  const data = await auth.api.setRole({
    body: {
      userId: session?.user.id || "",
      role: "admin", // required
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  console.log("data", data);
}
export async function logout() {
  await auth.api.signOut({ headers: (await headers()) as Headers });
}
