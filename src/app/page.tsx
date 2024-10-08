"use client"
import Image from "next/image";
import { AuthScreen } from "./features/auth/components/auth-screen";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const {signOut} = useAuthActions();
  return (
    <div>Hello

    <Button onClick={()=> signOut()}>Sign out</Button>
    </div>
  );
}
