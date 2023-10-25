import {
  ClerkLoaded,
  ClerkLoading,
  SignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import "./globals.css";
import { Spinner } from "./components/ui/spinner";
import { Layout } from "./layout";
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { POSPage } from "./pages/pos";
import { CategoryPage } from "./pages/pos/category";
import { store } from "./lib/store";
import { RootPage } from "./pages";
import { rootAction } from "./pages/action";

// const Data = observer(() => {
//   if (!store.data) return <Spinner />;
//   return <pre>{JSON.stringify(store.data, null, 2)}</pre>;
// });

// const Zones = observer(({ organizationId }: { organizationId: string }) => {
//   const { zones } = store;
//   const [currentZone, setCurrentZone] =
//     useState<(typeof store.zones)[number]>();

//   if (!zones) return null;
//   return (
//     <div className="flex gap-2 flex-col">
//       <div>
//         {zones.map((zone) => (
//           <Button
//             key={zone.id}
//             onClick={() => setCurrentZone(zone)}
//             variant={currentZone?.id === zone.id ? "default" : "secondary"}
//           >
//             {zone.name}
//           </Button>
//         ))}
//       </div>
//       {currentZone && (
//         <div>
//           <h2>{currentZone.name}</h2>
//           <div>
//             {currentZone.tables.map((table) => (
//               <Button key={table.id}>{table.name}</Button>
//             ))}
//           </div>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               const formData = new FormData(e.target as HTMLFormElement);
//               const name = formData.get("name") as string;
//               const usecase: Usecase = "create_table";
//               fetch(`http://localhost:1999/parties/main/${organizationId}`, {
//                 method: "POST",
//                 credentials: "include",
//                 body: JSON.stringify({
//                   usecase,
//                   payload: {
//                     zoneId: currentZone.id,
//                     name,
//                   },
//                 }),
//               });
//             }}
//           >
//             <Input type="text" name="name" />
//             <Button>New table</Button>
//           </form>
//         </div>
//       )}

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           const formData = new FormData(e.target as HTMLFormElement);
//           const name = formData.get("name") as string;
//           const usecase: Usecase = "create_zone";
//           fetch(`http://localhost:1999/parties/main/${organizationId}`, {
//             method: "POST",
//             credentials: "include",
//             body: JSON.stringify({
//               usecase,
//               payload: {
//                 name,
//               },
//             }),
//           });
//         }}
//       >
//         <Input type="text" name="name" />
//         <Button>New zone</Button>
//       </form>
//     </div>
//   );
// });

// const Home = () => {
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const [currentOrg, setCurrentOrg] = useState<string | undefined>(() =>
//     user?.organizationMemberships?.length === 1
//       ? user.organizationMemberships[0].id
//       : undefined
//   );
//   useEffect(() => {
//     if (!currentOrg) return;
//     getToken().then((token) => {
//       if (!token) return;
//       store.init({ org: currentOrg, token });
//     });
//   }, [currentOrg]);
//   return (
//     <div>
//       <p>Hello {user?.fullName}</p>
//       {currentOrg ? (
//         <>
//           <p>{currentOrg}</p>
//           <Zones organizationId={currentOrg} />
//         </>
//       ) : (
//         user?.organizationMemberships.map((org) => (
//           <Button
//             key={org.organization.id}
//             onClick={() => setCurrentOrg(org.organization.id)}
//           >
//             {org.organization.name}
//           </Button>
//         ))
//       )}
//       <Button asChild variant="destructive">
//         <SignOutButton />
//       </Button>
//     </div>
//   );
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootPage>
        <Outlet />
      </RootPage>
    ),
    action: rootAction,
    children: [
      {
        path: "pos",
        element: (
          <POSPage>
            <Outlet />
          </POSPage>
        ),
        children: [
          {
            path: ":categoryId",
            element: <CategoryPage />,
            shouldRevalidate: () => false,
            loader: ({ params }) => {
              const { categoryId } = params;
              if (!categoryId) return [];
              const categoryInStore = store.categories.find(
                (category) => category.id === Number(categoryId)
              );
              if (!categoryInStore) {
                return redirect("/pos");
              }
              return [...(categoryInStore.products || [])];
            },
          },
        ],
      },
      {
        path: "bar",
        element: <div className="text-white">bar</div>,
      },
    ],
  },
]);

const queryClient = new QueryClient();

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
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} fallbackElement={<Spinner />} />
          </QueryClientProvider>
        </SignedIn>
      </ClerkLoaded>
    </>
  );
}

export default App;
