import { CardInfo } from "@/lib/types";
import { Card } from "./card";

const size = 120;

type GameBoardProps = {
  rows: number;
  columns: number;
  cards: CardInfo[];
  matched: Set<CardInfo>;
  flipped: number[];
  onFlip: (index: number) => void;
};

export const GameBoard = ({
  rows,
  columns,
  cards,
  matched,
  flipped,
  onFlip,
}: GameBoardProps) => {
  return (
    <main className="rounded-lg border border-gray-200 h-fit">
      <div
        className="grid gap-2 justify-center p-5 rounded-lg"
        style={{
          gridTemplateRows: `repeat(${rows}, ${size}px)`,
          gridTemplateColumns: `repeat(${columns}, ${size}px)`,
        }}
      >
        {cards.map((card, index) => {
          const isMatched = matched.has(cards[index]);
          const isFlipped = flipped.includes(index);

          return (
            <Card
              key={index}
              card={card}
              isMatched={isMatched}
              isFlipped={isFlipped}
              onFlip={onFlip}
              index={index}
            />
          );
        })}
      </div>
    </main>
  );
};
