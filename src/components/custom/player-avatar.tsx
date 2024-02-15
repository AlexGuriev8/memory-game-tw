import { Avatar, AvatarFallback } from "../ui/avatar";

type PlayerAvatarProps = {
  name: string;
  score: number;
  isActive: boolean;
  isFlickering: boolean;
};

export const PlayerAvatar = ({
  name,
  score,
  isActive,
  isFlickering,
}: PlayerAvatarProps) => (
  <div
    className={`flex items-center justify-around p-2 rounded-lg gap-2 ${
      isActive ? "bg-green-500" : "bg-gray-200"
    } ${isFlickering ? "animate-flicker" : ""} shadow-md`}
  >
    <Avatar className="mr-2">
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
    <div className="player-score text-sm text-gray-600">Score: {score}</div>
  </div>
);
