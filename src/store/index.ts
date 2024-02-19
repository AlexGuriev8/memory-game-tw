import { defaultPlayers } from "@/features/options";
import { create, StateCreator } from "zustand";

import { generateCards } from "@/lib/utils";

import { CardInfo, GameModeType } from "@/lib/types";

interface GameSettingsSlice {
  rows: number;
  columns: number;
  delay: number;
  matchesCount: number;
  players: string[];
  scores: number[];
  isFlickering: boolean;
  activePlayer: number;
  gameMode: GameModeType;
  gameCompleted: boolean;
  actions: {
    setRows: (rows: number) => void;
    setColumns: (columns: number) => void;
    setDelay: (delay: number) => void;
    setMatchesCount: (count: number) => void;
    setScores: (scores: number[]) => void;
    setPlayers: (players: string[]) => void;
    addPlayer: () => void;
    setActivePlayer: (player: number) => void;
    setIsFlickering: (isFlickering: boolean) => void;
    setGameMode: (mode: GameModeType) => void;
    setGameCompleted: (completed: boolean) => void;
  };
}

interface GameBoardSlice {
  flipped: number[];
  matched: Set<CardInfo>;
  cards: CardInfo[];
  boardActions: {
    setFlipped: (flipped: number[]) => void;
    setMatched: (matched: Set<CardInfo>) => void;
    setCards: (
      data: CardInfo[],
      totalCount: number,
      matchesCount: number
    ) => void;
  };
}

export const createGameSettingsSlice: StateCreator<
  GameSettingsSlice,
  [],
  [],
  GameSettingsSlice
> = (set) => ({
  columns: 4,
  rows: 4,
  delay: 1000,
  matchesCount: 2,
  players: defaultPlayers,
  scores: Array(defaultPlayers.length).fill(0),
  isFlickering: false,
  activePlayer: 0,
  gameMode: "SINGLE_PLAYER",
  gameCompleted: false,
  actions: {
    setRows: (rows) => set(() => ({ rows })),
    setColumns: (cols) => set(() => ({ columns: cols })),
    setMatchesCount: (count) => set(() => ({ matchesCount: count })),
    setDelay: (delay) => set(() => ({ delay })),
    setScores: (scores) => set(() => ({ scores })),
    setActivePlayer: (activePlayer) => set(() => ({ activePlayer })),
    setIsFlickering: (isFlickering) => set(() => ({ isFlickering })),
    setPlayers: (players) => set(() => ({ players })),
    setGameMode: (mode) => set(() => ({ gameMode: mode })),
    setGameCompleted: (completed) => set(() => ({ gameCompleted: completed })),
    addPlayer: () =>
      set((state) => {
        const newPlayerNumber = state.players.length + 1;
        const newPlayer = `P${newPlayerNumber}`;
        return {
          players: [...state.players, newPlayer],
          scores: [...state.scores, 0],
        };
      }),
  },
});

const createGameBoardSlice: StateCreator<
  GameBoardSlice,
  [],
  [],
  GameBoardSlice
> = (set) => ({
  flipped: [],
  matched: new Set<CardInfo>(),
  cards: [],
  boardActions: {
    setFlipped: (flipped) => set({ flipped }),
    setMatched: (matched) => set({ matched }),
    setCards: (data, totalCount, matchesCount) =>
      set({ cards: generateCards(data, totalCount, matchesCount) }),
  },
});

export const useSettingsStore = create<GameSettingsSlice>()((...a) => ({
  ...createGameSettingsSlice(...a),
}));

export const useGameBoardStore = create<GameBoardSlice>((...a) => ({
  ...createGameBoardSlice(...a),
}));

export const useSettingsActions = () =>
  useSettingsStore((state) => state.actions);

export const useGameBoardActions = () =>
  useGameBoardStore((state) => state.boardActions);
