"use client";
import AppRoutes from "./pages/_AppRoutes";
import Login from "./pages/auth/Login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AppRoutes />
    </main>
  );
}
