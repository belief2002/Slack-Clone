"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOutIcon } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

export const UserButton = () => {

  const {signOut} = useAuthActions()
  const { data, isLoading } = useCurrentUser();

  if (isLoading)
    return <Loader className="size-4 animate-spin text-muted-foreground" />;

  if (!data) return null;

  const {name,email,image} = data;

  const avatarFallback = name!.charAt(0).toUpperCase()
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="hover:opacity-75 transition size-10 rounded-md">
          <AvatarImage className="rounded-md" alt={name} src={image}/>
          <AvatarFallback className="bg-sky-500 rounded-md text-white">{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem onClick={()=> signOut()}>
          <LogOutIcon className="size-4 mr-2"/>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
