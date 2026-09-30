import type { GameMode, SpeedPreset } from "./types";

export type ScoreRow = {
  name: string;
  score: number;
  mode: GameMode;
  speed: SpeedPreset;
  at: number;
};

export const MODE_INFO: Record<GameMode, { label: string; blurb: string }> = {
  cruise: { label: "Cruise", blurb: "Open road. Light traffic, extra nitro pads." },
  circuit: { label: "Circuit", blurb: "Classic run. Stages climb with your score." },
  rush: { label: "Nitro Rush", blurb: "Pads everywhere. Double-tap boost for blue flame." },
  survival: { label: "Survival", blurb: "Packed traffic and barriers. Highest payout." },
};

export const SPEED_INFO: Record<SpeedPreset, { label: string; mul: number }> = {
  touring: { label: "Touring", mul: 0.78 },
  sport: { label: "Sport", mul: 1 },
  super: { label: "Super", mul: 1.28 },
  insane: { label: "Insane", mul: 1.55 },
};

export const MODE_TUNING: Record<
  GameMode,
  {
    spawn: number;
    pads: number;
    barriersFrom: number;
    score: number;
    drain: number;
    extraTraffic: number;
    startTraffic: number;
    startPads: number;
    startHazards: number;
    startNitro: number;
  }
> = {
  cruise: { spawn: 2.6, pads: 0.42, barriersFrom: 99, score: 0.8, drain: 0.75, extraTraffic: 0, startTraffic: 1, startPads: 3, startHazards: 0, startNitro: 70 },
  circuit: { spawn: 1, pads: 1, barriersFrom: 2, score: 1, drain: 1, extraTraffic: 0.35, startTraffic: 4, startPads: 1, startHazards: 0, startNitro: 45 },
  rush: { spawn: 0.88, pads: 0.32, barriersFrom: 5, score: 1.15, drain: 0.62, extraTraffic: 0.4, startTraffic: 3, startPads: 5, startHazards: 0, startNitro: 90 },
  survival: { spawn: 0.4, pads: 1.25, barriersFrom: 1, score: 1.45, drain: 1.2, extraTraffic: 0.9, startTraffic: 8, startPads: 1, startHazards: 3, startNitro: 35 },
};

const TABLE_KEY = "fnp-highscores-v1";
const BEST_KEY = "fast-nd-praise-best";

function readTable(): ScoreRow[] {
  try {
    const raw = JSON.parse(localStorage.getItem(TABLE_KEY) || "[]") as ScoreRow[];
    if (!Array.isArray(raw)) return [];
    return raw.filter((r) => r && typeof r.score === "number").slice(0, 40);
  } catch {
    return [];
  }
}

function writeTable(rows: ScoreRow[]) {
  try {
    localStorage.setItem(TABLE_KEY, JSON.stringify(rows.slice(0, 20)));
  } catch {
    /* ignore */
  }
}

export function loadScores(): ScoreRow[] {
  return readTable().sort((a, b) => b.score - a.score);
}

export function overallBest(): number {
  const fromTable = loadScores()[0]?.score || 0;
  try {
    return Math.max(fromTable, Number(localStorage.getItem(BEST_KEY) || 0) || 0);
  } catch {
    return fromTable;
  }
}

export function bestFor(mode: GameMode, speed: SpeedPreset): number {
  return loadScores()
    .filter((r) => r.mode === mode && r.speed === speed)
    .reduce((m, r) => Math.max(m, r.score), 0);
}

export function submitScore(row: Omit<ScoreRow, "at">): { table: ScoreRow[]; best: number; isHigh: boolean } {
  const table = loadScores();
  const isHigh = row.score > 0 && (table.length < 10 || row.score > (table[table.length - 1]?.score || 0) || row.score >= overallBest());
  const next = [...table, { ...row, at: Date.now() }].sort((a, b) => b.score - a.score).slice(0, 10);
  writeTable(next);
  const best = next[0]?.score || row.score;
  try {
    localStorage.setItem(BEST_KEY, String(best));
  } catch {
    /* ignore */
  }
  return { table: next, best, isHigh: row.score > 0 && row.score === best };
}
