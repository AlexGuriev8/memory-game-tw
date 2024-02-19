import { useEffect } from "react";

import { useMemoryGame } from "@/hooks/useMemoryGame";

import { GameCompletedDialog } from "@/components/custom/game-completed-dialog";
import { GameSettings } from "@/components/custom/game-settings";
import { GameHeader } from "@/components/custom/game-header";
import { GameBoard } from "@/components/custom/game-board";

export const MemoryGame = () => {
  const {
    resetGame,
    rows,
    columns,
    matchesCount,
    isLoading,
    cards,
    matched,
    flipped,
    onFlip,
    handleGameModeChange,
    gameCompleted,
  } = useMemoryGame();

  useEffect(() => {
    resetGame();
  }, [columns, rows, matchesCount, resetGame]);

  return (
    <div className="flex flex-col items-center justify-center gap-2.5">
      <GameHeader />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className="flex gap-5">
          <div className="my-5">
            <GameBoard
              rows={rows}
              columns={columns}
              cards={cards}
              matched={matched}
              flipped={flipped}
              onFlip={onFlip}
            />
          </div>

          <GameSettings
            handleGameModeChange={handleGameModeChange}
            resetGame={resetGame}
          />
        </section>
      )}

      <GameCompletedDialog open={gameCompleted} onClose={resetGame} />
    </div>
  );
};
