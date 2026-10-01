import type { GameMode, SpeedPreset } from "./types";

export type ScoreRow = {
  name: string;
  score: number;
  mode: GameMode;
  speed: SpeedPreset;
  at: number;
};

export const MODE_INFO: Record<GameMode, { label: string; blurb: string }> = {
  cruise: { label: "Cruise", blurb: "Empty night highway. Almost no cars. Nitro refills fast." },
  circuit: { label: "Circuit", blurb: "Normal traffic. Stages climb. Classic race." },
  rush: { label: "Nitro Rush", blurb: "Pads every few seconds. Full tank. Boost is the point." },
  survival: { label: "Survival", blurb: "Packed lanes, wrecks in your face. One hit and you're done." },
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
    pool: number;
    padPool: number;
    hazardPool: number;
    packGap: number;
    spawnAheadMin: number;
    spawnAheadSpan: number;
    trafficSpeed: number;
    nitroRegen: number;
    padNitro: number;
    fog: number;
    fogNear: number;
    fogFar: number;
  }
> = {
  cruise: {
    spawn: 4.2, pads: 0.38, barriersFrom: 99, score: 0.7, drain: 0.5, extraTraffic: 0,
    startTraffic: 0, startPads: 4, startHazards: 0, startNitro: 90,
    pool: 4, padPool: 10, hazardPool: 2, packGap: 22, spawnAheadMin: 110, spawnAheadSpan: 80,
    trafficSpeed: 0.65, nitroRegen: 12, padNitro: 50, fog: 0x081018, fogNear: 70, fogFar: 250,
  },
  circuit: {
    spawn: 1.05, pads: 1, barriersFrom: 2, score: 1, drain: 1, extraTraffic: 0.28,
    startTraffic: 5, startPads: 2, startHazards: 0, startNitro: 45,
    pool: 16, padPool: 8, hazardPool: 8, packGap: 12, spawnAheadMin: 38, spawnAheadSpan: 55,
    trafficSpeed: 1, nitroRegen: 5.5, padNitro: 42, fog: 0x07090f, fogNear: 50, fogFar: 200,
  },
  rush: {
    spawn: 1.35, pads: 0.2, barriersFrom: 8, score: 1.25, drain: 0.34, extraTraffic: 0.15,
    startTraffic: 2, startPads: 8, startHazards: 0, startNitro: 100,
    pool: 10, padPool: 14, hazardPool: 4, packGap: 14, spawnAheadMin: 55, spawnAheadSpan: 50,
    trafficSpeed: 0.88, nitroRegen: 9, padNitro: 58, fog: 0x14081c, fogNear: 42, fogFar: 185,
  },
  survival: {
    spawn: 0.26, pads: 1.5, barriersFrom: 1, score: 1.7, drain: 1.4, extraTraffic: 1,
    startTraffic: 14, startPads: 1, startHazards: 6, startNitro: 22,
    pool: 28, padPool: 6, hazardPool: 12, packGap: 5.5, spawnAheadMin: 16, spawnAheadSpan: 36,
    trafficSpeed: 1.18, nitroRegen: 2.8, padNitro: 28, fog: 0x1a0708, fogNear: 32, fogFar: 150,
  },
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
