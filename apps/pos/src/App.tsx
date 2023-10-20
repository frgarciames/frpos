import { SignIn, SignOutButton, useAuth, useUser } from "@clerk/clerk-react";
import "./globals.css";
import { Button } from "./components/ui/button";

const Home = () => {
  const { user } = useUser();
  return (
    <div>
      <p>Hello {user?.fullName}</p>
      <Button asChild variant="destructive">
        <SignOutButton />
      </Button>
    </div>
  );
};

function App() {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return null;
  if (!isSignedIn) return <SignIn />;
  return <Home />;
}

export default App;
