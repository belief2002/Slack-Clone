import { Button } from "@/components/ui/button";
import { useGetWorspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Info, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useState } from "react";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useGetMembers } from "@/features/members/api/use-get-members";
import Link from "next/link";

export const Toolbar = () => {
  const [open, setOpen] = useState(false);
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorspace({ id: workspaceId });
  const { data: channels } = useGetChannels({ workspaceId });
  const { data: members } = useGetMembers({ workspaceId });

  return (
    <div className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="shrink grow-[2] min-w-[280px] max-w-[642px]">
        <Button
          onClick={() => setOpen(true)}
          size="sm"
          className=" bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2"
        >
          <Search className=" size-4 text-white mr-2" />
          <span className=" text-white text-xs">Search {data?.name}</span>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="search..." />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup heading="Channels">
              {channels?.map((channel) => (
                <CommandItem key={channel._id} onSelect={()=>setOpen(false)} asChild>
                    <Link href={`/workspace/${workspaceId}/channel/${channel._id}`}>
                    {channel.name}
                    </Link>
                    </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Members">
              {members?.map((member) => (
                <CommandItem key={member._id} onSelect={()=>setOpen(false)} asChild>
                    <Link href={`/workspace/${workspaceId}/member/${member._id}`}>
                    {member.user.name}
                    </Link>
                    </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
      <div className=" ml-auto flex flex-1 justify-end items-center">
        <Button variant="transparent" size="iconSm">
          <Info className=" size-5 text-white" />
        </Button>
      </div>
    </div>
  );
};
