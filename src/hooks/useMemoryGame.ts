import { useCallback, useMemo, useRef } from "react";
import { GameModeType, GameModes } from "@/lib/types";
import { defaultPlayers } from "@/features/options";

import { useDogs } from "./useDogs";
import {
  useGameBoardActions,
  useGameBoardStore,
  useSettingsActions,
  useSettingsStore,
} from "@/store";

export const useMemoryGame = () => {
  const { data, isLoading } = useDogs();

  const {
    columns,
    rows,
    delay,
    matchesCount,
    scores,
    activePlayer,
    players,
    gameMode,
    gameCompleted,
  } = useSettingsStore();

  const {
    setScores,
    setActivePlayer,
    setIsFlickering,
    setPlayers,
    setGameMode,
    setGameCompleted,
  } = useSettingsActions();

  const { flipped, cards, matched } = useGameBoardStore();
  const { setCards, setFlipped, setMatched } = useGameBoardActions();

  const totalCount = useMemo(() => rows * columns, [rows, columns]);
  const waitTimer = useRef<number | null | ReturnType<typeof setTimeout>>(null);

  const resetGame = useCallback(() => {
    if (waitTimer.current != null) {
      clearTimeout(waitTimer.current);
      waitTimer.current = null;
    }
    setCards(data, totalCount, matchesCount);
    setFlipped([]);
    setMatched(new Set());
    setActivePlayer(0);
    setScores(Array(defaultPlayers.length).fill(0));
    setGameCompleted(false);
    setPlayers(defaultPlayers);
  }, [matchesCount, totalCount, data]);

  const checkForMatch = (newFlipped: number[]): boolean => {
    return newFlipped.every(
      (flippedIndex) => cards[newFlipped[0]] === cards[flippedIndex]
    );
  };

  const updateScores = () => {
    const updatedScores = [...scores];
    updatedScores[activePlayer] += 1;
    setScores(updatedScores);
  };

  const startFlickering = () => {
    setIsFlickering(true);

    setTimeout(() => {
      setIsFlickering(false);
      setActivePlayer((activePlayer + 1) % players.length);
    }, delay);
  };

  const scheduleCardsReset = () => {
    const timer = setTimeout(() => {
      setFlipped([]);
      waitTimer.current = null;
    }, delay);

    waitTimer.current = timer;
  };

  const updateMatchedCards = (flippedCards: number[]) => {
    if (flippedCards.length === matchesCount) {
      const newMatchedSet = new Set(matched);
      newMatchedSet.add(cards[flippedCards[0]]);
      setMatched(newMatchedSet);

      updateScores();
      setFlipped([]);

      if (newMatchedSet.size * matchesCount === totalCount) {
        setGameCompleted(true);
      }
    }
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
        updateMatchedCards(newFlipped);
      } else {
        if (gameMode === GameModes.multiple) {
          startFlickering();
        }
        scheduleCardsReset();
      }
    }
  };

  const handleGameModeChange = (mode: GameModeType) => {
    setGameMode(mode);
    resetGame();
  };

  return {
    rows,
    columns,
    matchesCount,
    cards,
    matched,
    flipped,
    activePlayer,
    data,
    isLoading,
    gameCompleted,
    resetGame,
    handleGameModeChange,
    onFlip,
  };
};
