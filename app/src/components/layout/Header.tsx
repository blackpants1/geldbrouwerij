import { auth } from "@clerk/nextjs/server";
import { HeaderShell } from "./HeaderShell";

export async function Header() {
  const { userId } = await auth();
  return <HeaderShell isAuthed={Boolean(userId)} />;
}
