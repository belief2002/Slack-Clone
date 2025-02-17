"use client";
import { useGetWorspaces } from "@/features/workspaces/api/use-get-workspaces";
import { UserButton } from "../features/auth/components/user-button";
import { useEffect, useMemo } from "react";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      // redirect to workspace page
      console.log("Redirecting to workspace");
      router.replace(`workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);
  return (
    <div className="flex items-center justify-center h-full">
      <Loader className="size-4 animate-spin text-muted-foreground" />
    </div>
  );
}
