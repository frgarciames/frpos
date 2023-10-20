import type * as Party from "partykit/server";
import { Clerk, verifyToken } from "@clerk/backend";

export const organizationUser = async (
  request: Party.Request,
  { env, id }: { env: Party.Lobby["env"]; id: Party.Lobby["id"] }
) => {
  const CLERK_ENDPOINT = env.CLERK_ENDPOINT as string;
  const CLERK_SECRET_KEY = env.CLERK_SECRET_KEY as string;
  const CLERK_PUB_KEY = env.CLERK_PUBLISHABLE_KEY as string;
  const CLERK_JWT_KEY = env.CLERK_JWT_KEY as string;
  const cookies = request.headers.get("Cookie");
  const __session = cookies
    ?.split(";")
    .find((c) => c.trim().startsWith("__session="));

  const token =
    __session?.split?.("=")?.[1] ||
    new URL(request.url).searchParams.get("token") ||
    "";
  if (!token) return;

  const session = await verifyToken(token, { issuer: CLERK_ENDPOINT });
  const clerkOptions = {
    publishableKey: CLERK_PUB_KEY,
    jwtKey: CLERK_JWT_KEY,
    secretKey: CLERK_SECRET_KEY,
  };
  const clerkClient = Clerk(clerkOptions);

  const user = await clerkClient.users.getUser(session.sub);
  const organizationList =
    await clerkClient.users.getOrganizationMembershipList({
      userId: session.sub,
    });

  const org = organizationList.find(
    (organization) => organization.organization.id === id
  );
  if (!org) return;
  return {
    organization: org,
    user,
  };
};
