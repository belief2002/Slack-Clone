import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import { useGetMember } from "../api/use-get-member";
import { AlertTriangle, Loader, MailIcon, XIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface ProfileProps {
    memberId: Id<"members">;
    onClose: () => void;
}

export const Profile = ({
    memberId,
    onClose
}:ProfileProps)=>{
    const {data: member, isLoading: isLoadingMember} = useGetMember({id: memberId});



    if (isLoadingMember) {
        return (
          <div className="h-full flex flex-col">
            <div className="flex justify-between border-b px-2 h-[49px] items-center">
              <p className="text-lg font-bold">Profile</p>
              <Button onClick={onClose} size="iconSm" variant="ghost">
                <XIcon className="size-5 stroke-[1.5]" />
              </Button>
            </div>
            <div className="flex h-full items-center justify-center">
              <Loader className="size-5 animate-spin text-muted-foreground" />
            </div>
          </div>
        );
      }
      if (!member) {
        return (
          <div className="h-full flex flex-col">
            <div className="flex justify-between border-b px-2 h-[49px] items-center">
              <p className="text-lg font-bold">Profile</p>
              <Button onClick={onClose} size="iconSm" variant="ghost">
                <XIcon className="size-5 stroke-[1.5]" />
              </Button>
            </div>
            <div className="flex flex-col gap-y-2 h-full items-center justify-center">
              <AlertTriangle className="size-5  text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Profile not found.</p>
            </div>
          </div>
        );
      }

    const avatarFallback = member.user.name?.charAt(0).toUpperCase() ?? "M";

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between border-b px-2 h-[49px] items-center">
              <p className="text-lg font-bold">Profile</p>
              <Button onClick={onClose} size="iconSm" variant="ghost">
                <XIcon className="size-5 stroke-[1.5]" />
              </Button>
            </div>
            <div className="flex flex-col p-4 items-center justify-center">
            <Avatar className="max-w-[256px] max-h-[256px] size-full ">
              <AvatarImage src={member.user.image} />
              <AvatarFallback className="aspect-square text-6xl">{avatarFallback}</AvatarFallback>
            </Avatar>
            </div>
            <div className="flex flex-col p-4" >
                <p className="text-xl font-bold">{member.user.name} </p>

            </div>
            <Separator/>
            <div className="flex flex-col p-4" >
                <p className="text-sm mb-4 font-bold">Contact Information </p>
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center size-9 bg-muted rounded-md">
                        <MailIcon className="size-4" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[13px] text-muted-foreground font-semibold ">Email address</p>
                      <Link href={`mailto:${member.user.email}`} className="text-sm hover:underline text-[#1264a3]" >
                      {member.user.email}
                      </Link>
                    </div>
                </div>

            </div>
          </div>
    )
}
