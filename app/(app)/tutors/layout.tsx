import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function TutorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }
  const accountType = session.user.accountType as string;
  if (typeof accountType !== "string" || !accountType) {
    redirect("/account-selection");
  }

  const ALLOWED_ACCOUNT_TYPES = ["admin", "super-admin", "school", "parent"];
  if (!ALLOWED_ACCOUNT_TYPES.includes(accountType)) {
    redirect("/");
  }

  return children;
}
