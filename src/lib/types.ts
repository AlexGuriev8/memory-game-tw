export const GameModes = {
  single: "SINGLE_PLAYER",
  multiple: "MULTIPLE_PLAYER",
} as const;

export type GameModeType = (typeof GameModes)[keyof typeof GameModes];

export type CardInfo = {
  id: string;
  url: string;
  width: number;
  height: number;
};
