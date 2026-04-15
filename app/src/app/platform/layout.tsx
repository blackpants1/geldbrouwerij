import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { users } from "@/lib/db/store";
import { PlatformNav } from "@/components/platform/PlatformNav";
import { Container } from "@/components/ui/Container";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await readSession();
  if (!session) redirect("/inloggen?redirect=/platform");

  const user = await users.byId(session.uid);
  if (!user) redirect("/inloggen?error=expired");

  return (
    <div className="bg-schuim py-8 sm:py-12 lg:py-14 min-h-[calc(100vh-160px)]">
      <Container className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
        <PlatformNav
          naam={user.naam}
          email={user.email}
          initial={user.avatarInitial ?? user.naam[0].toUpperCase()}
        />
        <div className="min-w-0">{children}</div>
      </Container>
    </div>
  );
}
