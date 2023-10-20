import {
  ClerkLoaded,
  ClerkLoading,
  SignIn,
  SignOutButton,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import "./globals.css";
import { Button } from "./components/ui/button";
import { Spinner } from "./components/ui/spinner";
import { useEffect, useState } from "react";
import { store } from "./lib/store";
import { observer } from "mobx-react-lite";

const Data = observer(() => {
  if (!store.data) return <Spinner />;
  return <pre>{JSON.stringify(store.data, null, 2)}</pre>;
});

const Home = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [currentOrg, setCurrentOrg] = useState<string | undefined>(() =>
    user?.organizationMemberships?.length === 1
      ? user.organizationMemberships[0].id
      : undefined
  );
  useEffect(() => {
    if (!currentOrg) return;
    getToken().then((token) => {
      if (!token) return;
      store.init({ org: currentOrg, token });
    });
  }, [currentOrg]);
  return (
    <div>
      <p>Hello {user?.fullName}</p>
      {currentOrg ? (
        <>
          <p>{currentOrg}</p>
          <Data />
        </>
      ) : (
        user?.organizationMemberships.map((org) => (
          <Button
            key={org.organization.id}
            onClick={() => setCurrentOrg(org.organization.id)}
          >
            {org.organization.name}
          </Button>
        ))
      )}
      <Button asChild variant="destructive">
        <SignOutButton />
      </Button>
    </div>
  );
};

function App() {
  return (
    <>
      <ClerkLoading>
        <Spinner />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <div className="w-full h-[100vh] flex items-center justify-center">
            <SignIn />
          </div>
        </SignedOut>
        <SignedIn>
          <Home />
        </SignedIn>
      </ClerkLoaded>
    </>
  );
}

export default App;
