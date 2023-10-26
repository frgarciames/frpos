import { useAuth, useUser } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";
import { Calculator, Grid3X3, LogOut } from "lucide-react";
import { exit } from "@tauri-apps/plugin-process";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { store } from "./lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { useEffect } from "react";
import { Spinner } from "./components/ui/spinner";
import { Card, CardContent, CardFooter, CardTitle } from "./components/ui/card";
import { SettingsSection } from "./pages/settings";

export const Layout = observer(
  ({ children }: { children: React.ReactNode }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { user } = useUser();
    const { isLoading, data: token } = useQuery({
      queryKey: ["get_token"],
      queryFn: async () => {
        const token = await getToken();
        return token;
      },
      enabled: !!store.organization,
    });

    useEffect(() => {
      if (token && store.organization) {
        store.init({ org: store.organization, token });
      }
    }, [token, store.organization]);
    useEffect(() => {
      if (pathname === "/") {
        navigate("/pos");
      }
    }, [pathname]);
    return (
      <div className="flex flex-col min-h-screen bg-primary/50">
        <header className=" bg-primary-foreground items-center flex justify-between">
          <div className="ml-4 flex items-center space-x-2">
            <p className="mr-2">{user?.fullName}</p>
            <Button
              size="sm"
              variant="ghost"
              className="flex space-x-2"
              asChild
            >
              <NavLink to="/pos">
                <Calculator />
                <span>TPV</span>
              </NavLink>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="flex space-x-2"
              asChild
            >
              <NavLink to="/bar">
                <Grid3X3 />
                <span>BAR</span>
              </NavLink>
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              frpos
            </h2>
          </div>
          <div>
            <SettingsSection />
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => await exit(0)}
            >
              <LogOut />
            </Button>
          </div>
        </header>
        <main className="flex-1 flex w-full">
          {!store.organization ? (
            <Dialog open>
              <DialogContent withClose={false} className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Elige organización</DialogTitle>
                  <DialogDescription>
                    Parece que tienes más de una organización, elige la que
                    deseas gestionar
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 justify-around">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    user?.organizationMemberships.map(({ organization }) => (
                      <Card
                        key={organization.id}
                        onClick={() => {
                          store.organization = organization.id;
                        }}
                        className="overflow-hidden cursor-pointer border-0 shadow"
                      >
                        <CardContent className="relative overflow-hidden flex justify-center items-center p-0 min-w-[10rem] min-h-[10rem]">
                          <img
                            src={organization.imageUrl}
                            className="w-full"
                            alt=""
                          />
                        </CardContent>
                        <CardFooter className="p-4">
                          <CardTitle>{organization.name}</CardTitle>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ) : store.state === "CONNECTING" ? (
            <Spinner />
          ) : (
            children
          )}
        </main>
      </div>
    );
  }
);
