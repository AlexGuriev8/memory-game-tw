import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

type OptionItemProps = {
  label: string;
  hoverText: string;
  children: React.ReactNode;
};

export const OptionItem = ({ label, hoverText, children }: OptionItemProps) => {
  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </span>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm" side="left">
          {hoverText}
        </HoverCardContent>
      </HoverCard>
      {children}
    </div>
  );
};
