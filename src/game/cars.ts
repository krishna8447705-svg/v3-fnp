export type CarId = "apex" | "carbon" | "wide" | "roadster" | "night";
export type PaintId = "alpine" | "midnight" | "signal" | "laguna" | "amber";

export type CarInfo = {
  id: CarId;
  name: string;
  blurb: string;
  accel: number;
  grip: number;
  top: number;
  nitro: number;
};

export const CARS: CarInfo[] = [
  { id: "apex", name: "Apex Twin", blurb: "Twin-grille sports coupe. Balanced.", accel: 1, grip: 1.1, top: 1, nitro: 1 },
  { id: "carbon", name: "Carbon S", blurb: "Low supercar. Highest top speed.", accel: 1.12, grip: 0.86, top: 1.2, nitro: 0.95 },
  { id: "wide", name: "Widebody", blurb: "Fat arches. Sticks in corners.", accel: 0.94, grip: 1.24, top: 0.95, nitro: 1.12 },
  { id: "roadster", name: "Roadster", blurb: "Open top. Snappy throttle.", accel: 1.2, grip: 0.92, top: 0.98, nitro: 0.9 },
  { id: "night", name: "Night GT", blurb: "Grand tourer. Sips nitro.", accel: 0.98, grip: 1.05, top: 1.08, nitro: 1.28 },
];

export const PAINTS: { id: PaintId; name: string; color: number; token: string }[] = [
  { id: "alpine", name: "Alpine", color: 0xe8eaee, token: "bg-paint-alpine" },
  { id: "midnight", name: "Midnight", color: 0x1a2744, token: "bg-paint-midnight" },
  { id: "signal", name: "Signal", color: 0xc81e1e, token: "bg-paint-signal" },
  { id: "laguna", name: "Laguna", color: 0x1d6b4f, token: "bg-paint-laguna" },
  { id: "amber", name: "Amber", color: 0xc45c2d, token: "bg-paint-amber" },
];

export const CAR_IDS: CarId[] = CARS.map((c) => c.id);
export const PAINT_IDS: PaintId[] = PAINTS.map((p) => p.id);

export function carById(id: CarId): CarInfo {
  return CARS.find((c) => c.id === id) ?? CARS[0];
}

export function paintById(id: PaintId) {
  return PAINTS.find((p) => p.id === id) ?? PAINTS[0];
}
