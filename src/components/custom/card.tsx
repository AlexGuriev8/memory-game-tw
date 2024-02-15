import { DogInfo } from "@/hooks/useDogs";

type CardProps = {
  card: Pick<DogInfo, "url" | "id">;
  isMatched: boolean;
  isFlipped: boolean;
  index: number;
  onFlip: (index: number) => void;
};

export const Card = ({
  card,
  isMatched,
  isFlipped,
  onFlip,
  index,
}: CardProps) => {
  const cardStyle = {
    backgroundImage: isMatched || isFlipped ? `url(${card.url})` : undefined,
    backgroundColor: "#96A09E",
  };

  const cardClasses = `flex items-center justify-center rounded-md text-4xl cursor-pointer bg-gray-200 overflow-hidden relative ${
    isMatched || isFlipped ? "bg-cover bg-no-repeat bg-center" : ""
  }`;

  return (
    <button
      key={index}
      disabled={isMatched || isFlipped}
      className={cardClasses}
      style={cardStyle}
      onClick={() => onFlip(index)}
    />
  );
};
