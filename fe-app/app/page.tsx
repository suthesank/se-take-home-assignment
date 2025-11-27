"use client";

import { AppProvider } from "./context/appContext";
import Dashboard from "./dashboard/dashboard";

export default function Home() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}
