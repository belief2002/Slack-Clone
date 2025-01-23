import { format } from "date-fns";

interface ChannelHeroProps {
    name: string;
    creationTime: number;
}

export const ChannelHero = ({ name, creationTime }: ChannelHeroProps) => {
    return (
        <div className="mt-[88px] mb-4 mx-5 ">
            <div className="flex items-center font-bold text-2xl mb-2 ">
                #{name}
            </div>
            <p className="font-normal text-slate-800 mb-4 ">
                This channel has been created on {format(creationTime,"MMMM do, yyyy")}.This is the very beginning of the <strong>{name}</strong> channel.
            </p>

        </div>
    )
}