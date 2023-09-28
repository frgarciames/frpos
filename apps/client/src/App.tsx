import { SignIn, UserButton, useAuth, useUser } from "@clerk/clerk-react";
import type { App } from "@frpos/server";
import { useEffect, useState } from "react";
// import { edenTreaty } from "@elysiajs/eden";

import PartySocket from "partysocket";
// const app = edenTreaty<App>("http://localhost:3001");

// const reportSubscription = app.report.subscribe();
// reportSubscription.on("open", (e) => {
//   console.log("open", e);
// });
// const wsClient = createWSClient({
//   url: `ws://localhost:3001/ws`,
// });
// // configure TRPCClient to use WebSockets transport
// const client = createTRPCProxyClient<Router>({
//   links: [
//     wsLink({
//       client: wsClient,
//     }),
//   ],
// });

class Party {
  connection: PartySocket | null = null;

  init({ org, token }: { org: string; token: string }) {
    if (this.connection) return this.connection;
    this.connection = new PartySocket({
      host: "http://127.0.0.1:1999",
      room: org,
      query: {
        token,
      },
    });
    return this.connection;
  }
}

const party = new Party();

function App() {
  // const [wsClientId, setWsClientId] = useState<string>();
  // const [currentReport, setCurrentReport] = useState<any>();
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [currentOrg, setCurrentOrg] = useState<string>();

  // const handleClick = async () => {
  //   client.add.mutate(undefined, { orgId: currentOrg });
  // };

  // useEffect(() => {
  //   client.currentReport.subscribe(undefined, {
  //     onComplete() {
  //       console.log("complete");
  //     },
  //     onError(error) {
  //       console.log(error);
  //     },
  //     onStarted() {
  //       console.log("started");
  //     },
  //     onStopped() {
  //       console.log("stopped");
  //     },
  //     onData(data) {
  //       console.log(data);
  //       setCurrentReport(data);
  //     },
  //   });
  // }, []);

  useEffect(() => {
    if (!user) return;
    if (currentOrg) return;
    const org =
      user.organizationMemberships.length === 0 ||
      user.organizationMemberships.length > 1
        ? undefined
        : user.organizationMemberships[0].id;
    setCurrentOrg(org);
  }, [user, currentOrg]);

  // useEffect(() => {
  //   if (!currentOrg) return;

  //   reportSubscription.subscribe((message) => {
  //     document.querySelector("#json")!.innerHTML = JSON.stringify(message);

  //     // setCurrentReport(message.data);
  //   });
  //   return () => {
  //     reportSubscription.close();
  //   };
  // }, [currentOrg]);

  // useEffect(() => {
  //   getToken().then((token) => {
  //     console.log(token);
  //     fetch("http://localhost:3001/start-ws", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         setWsClientId(res.clientId);
  //       });
  //   });
  // }, []);

  // const handleClick = async () => {
  //   if (!currentOrg) return;
  //   fetch("http://localhost:3001/", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };

  useEffect(() => {
    if (!currentOrg) return;
    getToken().then((token) => {
      if (!token) return;
      const conn = party.init({ org: currentOrg, token });
      conn?.addEventListener("close", (e) => {
        console.log(e);
      });
      conn?.addEventListener("open", (e) => {
        console.log("open");
        document.querySelector("#json")!.innerHTML = JSON.stringify(e.data);
      });
      conn?.addEventListener("error", (e) => {
        console.log(e);
        window.location.reload();
      });
      conn?.addEventListener("message", (e) => {
        console.log("message");
        document.querySelector("#json")!.innerHTML = JSON.stringify(e.data);
      });
    });
  }, [currentOrg]);

  if (!isSignedIn) {
    return <SignIn />;
  }

  if (!currentOrg) {
    return (
      <div>
        <ul>
          {user?.organizationMemberships.map((org) => (
            <li key={org.id}>
              {org.organization.name}
              <button onClick={() => setCurrentOrg(org.id)}>select</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const PARTYKIT_HOST = "http://localhost:1999";

  return (
    <div>
      <UserButton />
      {/* {currentReport && JSON.stringify(currentReport)} */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const id = formData.get("id");
          const name = formData.get("name");

          const url = new URL(`${PARTYKIT_HOST}/parties/main/${currentOrg}`);

          // url.searchParams.set("usecase", "get_zone");
          // url.searchParams.set("payload", JSON.stringify({ id: name }));

          fetch(url, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify({
              usecase: "update_zone",
              payload: {
                id,
                name,
              },
            }),
          });
        }}
      >
        <input name="name" placeholder="name" />
        <input name="id" placeholder="id" />
        <button type="submit">submit</button>
      </form>
      <button onClick={() => {}}>click</button>
      <div id="json" />
    </div>
  );
}

export default App;
