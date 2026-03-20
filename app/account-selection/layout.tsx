import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AccountSelectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }
  if (
    session.user.accountType === "admin" ||
    session.user.accountType === "super-admin"
  ) {
    redirect("/dashboard");
  }
  if (
    session.user.accountType === "teacher" ||
    session.user.accountType === "school"
  ) {
    redirect("/jobs");
  }
  if (session.user.accountType === "parent") {
    redirect("/tutors");
  }
  return children;
}
