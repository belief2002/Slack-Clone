import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog";
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
            className="rounded-md size-full object-contain"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="maz-w-[800px] border-none bg-transparent p-0 shadow-none">
        <img
          src={url}
          alt="image"
          className="rounded-md  size-full object-cover"
        />
      </DialogContent>
    </Dialog>
  );
};
