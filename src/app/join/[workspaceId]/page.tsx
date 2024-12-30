"use client";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import Image from "next/image";
import Link from "next/link";
import VerificationInput from "react-verification-input";

const JoinPage = () => {
    const workspaceId = useWorkspaceId()
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-8 bg-white p-8 rounded-lg shadow-md">
      <Image
        src="/hashtag-circle-svgrepo.svg"
        alt="logo"
        height={60}
        width={60}
      />
      <div className="flex flex-col items-center justify-center gap-y-4 max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="font-bold text-2xl">Join workspace</h1>
          <p className="text-muted-foreground text-lg">
            Enter the workspace join code to join
          </p>
        </div>
        <VerificationInput
          length={6}
          classNames={{
            container: "flex gap-x-2",
            character:
              "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text=lg font-medium text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
