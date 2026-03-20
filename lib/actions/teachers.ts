"use server";
import { teacherSchema } from "@/schema/auth";
import z from "zod";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
export const updateAccount = async (data: z.infer<typeof teacherSchema>) => {
  const response = await auth.api.updateUser({
    headers: await headers(),
    body: {
      tscNumber: data.tscNumber,
      subjects: data.subjects,
      experience: data.experience?.toString(),
      qualifications: data.qualifications,
      accountType: "teacher",
    },
  });
  revalidatePath("/account-selection");
  return response;
};
