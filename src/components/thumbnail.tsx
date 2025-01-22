import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
interface ThumbnailProps {
  url: string | undefined | null;
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) return null;

  return (
    
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-[360px]  rounded-lg border my-2 cursor-zoom-in">
          <img
            src={url}
            alt="image"
            className="rounded-md size-full object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="maz-w-[800px]  border-none h-auto bg-transparent p-0 shadow-none">
      <ScrollArea className="max-h-[700px]">
        <img
          src={url}
          alt="image"
          className="rounded-md h-auto  size-full object-cover"
        />
    </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
