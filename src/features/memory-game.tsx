import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { GameCompletedDialog } from "@/components/custom/game-completed-dialog";
import { PlayerAvatar } from "@/components/custom/player-avatar";
import { OptionItem } from "@/components/custom/option-item";
import { Card } from "@/components/custom/card";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  columnOptions,
  defaultPlayers,
  delayOptions,
  matchesOptions,
  maxAllowedUsers,
  rowOptions,
} from "./options";

import { generateCards } from "../lib/utils";
import { useDogs } from "../hooks/useDogs";

const GameModes = {
  single: "SINGLE_PLAYER",
  multiple: "MULTIPLE_PLAYER",
} as const;

type GameModeType = (typeof GameModes)[keyof typeof GameModes];

export const MemoryGame = ({
  cols = 5,
  pRows = 4,
  pDelay = 1000,
  pMatchCount = 2,
  size = 120,
}) => {
  const { data, isLoading } = useDogs();

  const [players, setPlayers] = useState(defaultPlayers);

  const [columns, setColumns] = useState(cols);
  const [delay, setDelay] = useState(pDelay);
  const [rows, setRows] = useState(pRows);
  const [matchCount, setMatchCount] = useState(pMatchCount);

  const totalCount = useMemo(() => rows * columns, [rows, columns]);

  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState(new Set());

  const waitTimer = useRef<number | null | ReturnType<typeof setTimeout>>(null);
  const [isFlickering, setIsFlickering] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const [gameMode, setGameMode] = useState<GameModeType>(GameModes.single);
  const [activePlayer, setActivePlayer] = useState(0);
  const [scores, setScores] = useState(Array(players.length).fill(0));

  const [cards, setCards] = useState(() =>
    generateCards(data, totalCount, matchCount)
  );

  const resetGame = useCallback(() => {
    if (waitTimer.current != null) {
      clearTimeout(waitTimer.current);
      waitTimer.current = null;
    }

    setCards(generateCards(data, totalCount, matchCount));
    setFlipped([]);
    setMatched(new Set());
    setActivePlayer(0);
    setScores(Array(players.length).fill(0));
    setGameCompleted(false);
    setPlayers(defaultPlayers);
  }, [matchCount, totalCount, data]);

  const addPlayer = useCallback(() => {
    const newPlayerNumber = players.length + 1;
    const newPlayer = `P${newPlayerNumber}`;

    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    setScores((prevScores) => [...prevScores, 0]);
  }, [players.length]);

  useEffect(() => {
    resetGame();
  }, [cols, rows, matchCount, resetGame]);

  const checkForMatch = (newFlipped: number[]): boolean => {
    return newFlipped.every(
      (flippedIndex) => cards[newFlipped[0]] === cards[flippedIndex]
    );
  };

  const onFlip = (index: number) => {
    let currFlipped = flipped;

    if (waitTimer.current != null) {
      clearTimeout(waitTimer.current);
      waitTimer.current = null;
      currFlipped = [];
    }

    const newFlipped = [...currFlipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length > 1) {
      const isMatch = checkForMatch(newFlipped);

      if (isMatch) {
        if (newFlipped.length === matchCount) {
          const newMatchedSet = new Set(matched);
          newMatchedSet.add(cards[newFlipped[0]]);
          setMatched(newMatchedSet);

          const updatedScores = [...scores];
          updatedScores[activePlayer] += 1;
          setScores(updatedScores);

          setFlipped([]);

          if (newMatchedSet.size * matchCount === totalCount) {
            setGameCompleted(true);
          }
        }
      } else {
        if (gameMode === GameModes.multiple) {
          setIsFlickering(true);
          setTimeout(() => {
            setIsFlickering(false);
            setActivePlayer((prev) => (prev + 1) % players.length);
          }, delay);
        }

        const timer = setTimeout(() => {
          setFlipped([]);
          waitTimer.current = null;
        }, delay);

        waitTimer.current = timer;
      }
    }
  };

  const handleGameModeChange = (mode: GameModeType) => {
    setGameMode(mode);
    resetGame();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2.5">
      <header className="bg-white border-b border-gray-200 rounded-t-lg p-5">
        Memory Game
      </header>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className="flex gap-5">
          <div className="my-5">
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
          </div>

          <aside className="content gap-3.5 p-5 border border-gray-200 rounded-lg shadow-lg my-5 h-fit">
            <Tabs defaultValue="single" className="mb-4">
              <OptionItem
                label="Mode"
                hoverText="Choose 'Single Player' for a solo memory challenge, or
                    'Multi Player' to enjoy a competitive matching game with
                    friends."
              >
                <TabsList>
                  <TabsTrigger
                    value="single"
                    onClick={() => handleGameModeChange(GameModes.single)}
                  >
                    Single Player
                  </TabsTrigger>
                  <TabsTrigger
                    value="multi"
                    onClick={() => handleGameModeChange(GameModes.multiple)}
                  >
                    Multi Player
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="single">
                  <div className="flex flex-col gap-2">
                    <PlayerAvatar
                      name={players[0]}
                      score={scores[0]}
                      isActive
                      isFlickering={false}
                    />

                    <div className="flex justify-end mt-2">
                      <Button variant="outline" onClick={resetGame}>
                        Reset Game
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="multi">
                  <div className="flex flex-col gap-2">
                    {players.map((player, index) => (
                      <PlayerAvatar
                        key={index}
                        name={player}
                        score={scores[index]}
                        isActive={index === activePlayer}
                        isFlickering={isFlickering && index === activePlayer}
                      />
                    ))}

                    <div className="flex justify-end mt-2">
                      <Button variant="outline" onClick={resetGame}>
                        Reset Game
                      </Button>
                      <Button
                        variant="outline"
                        onClick={addPlayer}
                        className="ml-2"
                        disabled={players.length === maxAllowedUsers}
                      >
                        Add Player
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </OptionItem>
            </Tabs>

            <OptionItem
              label="Matches Count"
              hoverText="Flip cards to find matching sets based on the selected 'Match
                  Count'. Mismatched cards automatically turn back over,
                  challenging your memory and strategy skills."
            >
              <RadioGroup
                defaultValue="2"
                onValueChange={(e) => setMatchCount(Number(e))}
                value={`${matchCount}`}
              >
                {matchesOptions.map(({ id, label, value }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={id} />
                    <Label htmlFor={id}>{label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </OptionItem>

            <div className="mt-4">
              <OptionItem
                label="Delay"
                hoverText="Delay before selected non-matching cards are flipped back over."
              >
                <RadioGroup
                  defaultValue="5"
                  onValueChange={(e) => setDelay(Number(e))}
                  value={`${delay}`}
                >
                  {delayOptions.map(({ id, value, label }) => (
                    <div key={id} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={id} />
                      <Label htmlFor={id}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </OptionItem>
            </div>

            <div className="flex gap-20 mt-4">
              <OptionItem
                label="Columns"
                hoverText="Provide custom number of Columns."
              >
                <RadioGroup
                  defaultValue="5"
                  onValueChange={(e) => setColumns(Number(e))}
                  value={`${columns}`}
                >
                  {columnOptions.map(({ id, value, label }) => (
                    <div key={id} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={id} />
                      <Label htmlFor={id}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </OptionItem>

              <OptionItem
                label="Rows"
                hoverText="Provide custom number of Rows."
              >
                <RadioGroup
                  defaultValue="5"
                  onValueChange={(e) => setRows(Number(e))}
                  value={`${rows}`}
                >
                  {rowOptions.map(({ id, value, label }) => (
                    <div key={id} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={id} />
                      <Label htmlFor={id}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </OptionItem>
            </div>
          </aside>
        </section>
      )}

      <GameCompletedDialog open={gameCompleted} onClose={resetGame} />
    </div>
  );
};
