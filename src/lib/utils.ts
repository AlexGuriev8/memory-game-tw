import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffle<T>(array: T[]): void {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function generateCards<T>(
  data: T[],
  totalCount: number,
  matchCount: number
) {
  const numGroups = totalCount / matchCount;

  const dataList = data.slice(0, numGroups);

  const cards = Array.from({ length: numGroups }, () => null)
    .map((_, idx) => idx)
    .map((idx) => Array.from({ length: matchCount }, () => dataList[idx]))
    .flat();

  shuffle(cards);

  return cards;
}
