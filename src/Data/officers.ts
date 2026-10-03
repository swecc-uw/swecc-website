import officers2022 from "./officers2022.json";
import officers2023 from "./officers2023.json";
import officers2024 from "./officers2024.json";
import officers2026 from "./officers2026.json";

export type Officer = {
  name: string;
  imgSrc?: string;
  position: string;
  linkedin?: string;
  github?: string;
  email?: string;
  portfolio?: string;
  funFact?: string;
};

export const officersByYear: Record<number, Officer[]> = {
  2022: officers2022,
  2023: officers2023,
  2024: officers2024,
  2026: officers2026,
};

const JULY = 6;

export function rosterYears(now: Date): number[] {
  const thisYear = now.getFullYear();
  const showThisYear = now.getMonth() >= JULY;
  return Object.keys(officersByYear)
    .map(Number)
    .filter((year) => year < thisYear || (year === thisYear && showThisYear))
    .sort((a, b) => b - a);
}
