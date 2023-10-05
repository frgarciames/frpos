import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

const clerk_pub_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerk_pub_key}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
