import { o as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Pause, i as RotateCcw, n as Users, o as Gauge, t as Zap } from "../_libs/lucide-react.mjs";
import { A as Sprite, C as PointLight, D as ShaderMaterial, E as Scene, M as TorusGeometry, N as Vector3, O as SphereGeometry, S as PlaneGeometry, T as SRGBColorSpace, _ as MeshBasicMaterial, a as CanvasTexture, b as Object3D, c as Color, d as DirectionalLight, f as Fog, g as Mesh, h as InstancedMesh, i as BufferGeometry, j as SpriteMaterial, k as SpotLight, l as ConeGeometry, m as HemisphereLight, n as BoxGeometry, o as CircleGeometry, p as Group, r as BufferAttribute, s as ClampToEdgeWrapping, t as WebGLRenderer, u as CylinderGeometry, v as MeshPhysicalMaterial, w as RepeatWrapping, x as PerspectiveCamera, y as MeshStandardMaterial } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Du6ERZ4U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MODE_INFO = {
	cruise: {
		label: "Cruise",
		blurb: "Empty night highway. Almost no cars. Nitro refills fast."
	},
	circuit: {
		label: "Circuit",
		blurb: "Normal traffic. Stages climb. Classic race."
	},
	rush: {
		label: "Nitro Rush",
		blurb: "Pads every few seconds. Full tank. Boost is the point."
	},
	survival: {
		label: "Survival",
		blurb: "Packed lanes, wrecks in your face. One hit and you're done."
	}
};
var SPEED_INFO = {
	touring: {
		label: "Touring",
		mul: .78
	},
	sport: {
		label: "Sport",
		mul: 1
	},
	super: {
		label: "Super",
		mul: 1.28
	},
	insane: {
		label: "Insane",
		mul: 1.55
	}
};
var MODE_TUNING = {
	cruise: {
		spawn: 4.2,
		pads: .38,
		barriersFrom: 99,
		score: .7,
		drain: .5,
		extraTraffic: 0,
		startTraffic: 0,
		startPads: 4,
		startHazards: 0,
		startNitro: 90,
		pool: 4,
		padPool: 10,
		hazardPool: 2,
		packGap: 22,
		spawnAheadMin: 110,
		spawnAheadSpan: 80,
		trafficSpeed: .65,
		nitroRegen: 12,
		padNitro: 50,
		fog: 13732440,
		fogNear: 85,
		fogFar: 280
	},
	circuit: {
		spawn: 1.05,
		pads: 1,
		barriersFrom: 2,
		score: 1,
		drain: 1,
		extraTraffic: .28,
		startTraffic: 5,
		startPads: 2,
		startHazards: 0,
		startNitro: 45,
		pool: 16,
		padPool: 8,
		hazardPool: 8,
		packGap: 12,
		spawnAheadMin: 38,
		spawnAheadSpan: 55,
		trafficSpeed: 1,
		nitroRegen: 5.5,
		padNitro: 42,
		fog: 12875856,
		fogNear: 62,
		fogFar: 235
	},
	rush: {
		spawn: 1.35,
		pads: .2,
		barriersFrom: 8,
		score: 1.25,
		drain: .34,
		extraTraffic: .15,
		startTraffic: 2,
		startPads: 8,
		startHazards: 0,
		startNitro: 100,
		pool: 10,
		padPool: 14,
		hazardPool: 4,
		packGap: 14,
		spawnAheadMin: 55,
		spawnAheadSpan: 50,
		trafficSpeed: .88,
		nitroRegen: 9,
		padNitro: 58,
		fog: 11559032,
		fogNear: 52,
		fogFar: 205
	},
	survival: {
		spawn: .26,
		pads: 1.5,
		barriersFrom: 1,
		score: 1.7,
		drain: 1.4,
		extraTraffic: 1,
		startTraffic: 14,
		startPads: 1,
		startHazards: 6,
		startNitro: 22,
		pool: 28,
		padPool: 6,
		hazardPool: 12,
		packGap: 5.5,
		spawnAheadMin: 16,
		spawnAheadSpan: 36,
		trafficSpeed: 1.18,
		nitroRegen: 2.8,
		padNitro: 28,
		fog: 11032640,
		fogNear: 40,
		fogFar: 175
	}
};
var TABLE_KEY = "fnp-highscores-v1";
var BEST_KEY = "fast-nd-praise-best";
function readTable() {
	try {
		const raw = JSON.parse(localStorage.getItem(TABLE_KEY) || "[]");
		if (!Array.isArray(raw)) return [];
		return raw.filter((r) => r && typeof r.score === "number").slice(0, 40);
	} catch {
		return [];
	}
}
function writeTable(rows) {
	try {
		localStorage.setItem(TABLE_KEY, JSON.stringify(rows.slice(0, 20)));
	} catch {}
}
function loadScores() {
	return readTable().sort((a, b) => b.score - a.score);
}
function overallBest() {
	const fromTable = loadScores()[0]?.score || 0;
	try {
		return Math.max(fromTable, Number(localStorage.getItem(BEST_KEY) || 0) || 0);
	} catch {
		return fromTable;
	}
}
function bestFor(mode, speed) {
	return loadScores().filter((r) => r.mode === mode && r.speed === speed).reduce((m, r) => Math.max(m, r.score), 0);
}
function submitScore(row) {
	const table = loadScores();
	row.score > 0 && (table.length < 10 || row.score > (table[table.length - 1]?.score || 0) || (row.score, overallBest()));
	const next = [...table, {
		...row,
		at: Date.now()
	}].sort((a, b) => b.score - a.score).slice(0, 10);
	writeTable(next);
	const best = next[0]?.score || row.score;
	try {
		localStorage.setItem(BEST_KEY, String(best));
	} catch {}
	return {
		table: next,
		best,
		isHigh: row.score > 0 && row.score === best
	};
}
function makeSkyMaterial() {
	return new ShaderMaterial({
		side: 1,
		depthWrite: false,
		fog: false,
		uniforms: { uTime: { value: 0 } },
		vertexShader: `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
		fragmentShader: `
      varying vec3 vPos;
      uniform float uTime;
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }
      void main() {
        vec3 dir = normalize(vPos);
        float h = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 zenith = vec3(0.12, 0.22, 0.48);
        vec3 horizon = vec3(0.98, 0.52, 0.28);
        vec3 ground = vec3(0.42, 0.22, 0.16);
        vec3 col = mix(ground, horizon, smoothstep(-0.18, 0.08, dir.y));
        col = mix(col, zenith, pow(max(h, 0.0), 1.55));
        vec3 sunDir = normalize(vec3(0.62, 0.16, 0.38));
        float sun = pow(max(dot(dir, sunDir), 0.0), 90.0);
        float halo = pow(max(dot(dir, sunDir), 0.0), 8.0);
        float glow = pow(max(dot(dir, sunDir), 0.0), 2.2);
        col += vec3(1.0, 0.86, 0.55) * sun * 2.8;
        col += vec3(1.0, 0.55, 0.22) * halo * 0.55;
        col += vec3(0.95, 0.35, 0.18) * glow * 0.28;
        vec2 cuv = dir.xz / max(dir.y, 0.07);
        vec2 warp = vec2(noise(cuv * 0.7 + uTime * 0.004), noise(cuv * 0.7 + 4.2));
        vec2 p = cuv * 1.15 + warp * 0.55;
        float n = noise(p);
        n += 0.55 * noise(p * 2.1 - vec2(uTime * 0.01, 0.3));
        n += 0.28 * noise(p * 4.3 + vec2(0.2, uTime * 0.008));
        n += 0.14 * noise(p * 8.0);
        float mask = smoothstep(0.02, 0.28, dir.y) * (1.0 - smoothstep(0.55, 0.92, dir.y));
        float cloud = smoothstep(0.48, 0.72, n) * mask;
        float rim = smoothstep(0.46, 0.55, n) * (1.0 - smoothstep(0.62, 0.78, n));
        vec3 shade = vec3(0.42, 0.28, 0.32);
        vec3 lit = mix(vec3(1.0, 0.72, 0.48), vec3(0.98, 0.96, 0.94), smoothstep(0.15, 0.7, dir.y));
        col = mix(col, shade, cloud * 0.35);
        col = mix(col, lit, cloud * 0.82);
        col += vec3(1.0, 0.85, 0.7) * rim * mask * 0.45;
        gl_FragColor = vec4(col, 1.0);
      }
    `
	});
}
function makeFlameMaterial(color) {
	return new ShaderMaterial({
		transparent: true,
		depthWrite: false,
		blending: 2,
		side: 2,
		uniforms: {
			uTime: { value: 0 },
			uOn: { value: 0 },
			uColor: { value: color }
		},
		vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
		fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uOn;
      uniform vec3 uColor;
      void main() {
        float flicker = 0.72 + 0.28 * sin(uTime * 38.0 + vUv.x * 12.0);
        float core = 1.0 - abs(vUv.x - 0.5) * 2.0;
        float fall = pow(1.0 - vUv.y, 1.35);
        float a = uOn * flicker * core * fall;
        vec3 col = mix(uColor, vec3(1.0, 0.96, 0.85), fall * 0.45);
        gl_FragColor = vec4(col * a, a);
      }
    `
	});
}
function patchRoadShader(mat, uTime) {
	mat.onBeforeCompile = (shader) => {
		shader.uniforms.uTime = uTime;
		shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>
uniform float uTime;`).replace("#include <color_fragment>", `#include <color_fragment>
float stripe = vMapUv.x;
float edge = smoothstep(0.018, 0.0, stripe) + smoothstep(0.982, 1.0, stripe);
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.95, 0.93, 0.86), edge * 0.4);
float sheen = 0.10 * pow(max(stripe * (1.0 - stripe) * 4.0, 0.0), 1.8);
diffuseColor.rgb += vec3(0.14, 0.16, 0.18) * sheen;
diffuseColor.rgb += 0.018 * sin(vMapUv.y * 36.0 - uTime * 7.0);`);
	};
	mat.customProgramCacheKey = () => "fnp-road-v2";
}
var CARS = [
	{
		id: "apex",
		name: "Apex Twin",
		blurb: "Twin-grille sports coupe. Balanced.",
		accel: 1,
		grip: 1.1,
		top: 1,
		nitro: 1
	},
	{
		id: "carbon",
		name: "Carbon S",
		blurb: "Low supercar. Highest top speed.",
		accel: 1.12,
		grip: .86,
		top: 1.2,
		nitro: .95
	},
	{
		id: "wide",
		name: "Widebody",
		blurb: "Fat arches. Sticks in corners.",
		accel: .94,
		grip: 1.24,
		top: .95,
		nitro: 1.12
	},
	{
		id: "roadster",
		name: "Roadster",
		blurb: "Open top. Snappy throttle.",
		accel: 1.2,
		grip: .92,
		top: .98,
		nitro: .9
	},
	{
		id: "night",
		name: "Night GT",
		blurb: "Grand tourer. Sips nitro.",
		accel: .98,
		grip: 1.05,
		top: 1.08,
		nitro: 1.28
	}
];
var PAINTS = [
	{
		id: "alpine",
		name: "Alpine",
		color: 15264494,
		token: "bg-paint-alpine"
	},
	{
		id: "midnight",
		name: "Midnight",
		color: 1713988,
		token: "bg-paint-midnight"
	},
	{
		id: "signal",
		name: "Signal",
		color: 13114910,
		token: "bg-paint-signal"
	},
	{
		id: "laguna",
		name: "Laguna",
		color: 1928015,
		token: "bg-paint-laguna"
	},
	{
		id: "amber",
		name: "Amber",
		color: 12868653,
		token: "bg-paint-amber"
	}
];
CARS.map((c) => c.id);
PAINTS.map((p) => p.id);
function carById(id) {
	return CARS.find((c) => c.id === id) ?? CARS[0];
}
function paintById(id) {
	return PAINTS.find((p) => p.id === id) ?? PAINTS[0];
}
var ROAD_HALF = 8.6;
var LANE = [
	-5.2,
	0,
	5.2
];
var PATH_DS = 6;
var PATH_N = 1800;
var FIXED_DT = 1 / 60;
var TRAFFIC_COLORS = [
	3108845,
	14753096,
	4033370,
	13214247,
	5989488
];
function buildPath() {
	const samples = [];
	let x = 0;
	let z = 0;
	let yaw = 0;
	let s = 0;
	for (let i = 0; i < PATH_N; i++) {
		const fx = -Math.sin(yaw);
		const fz = -Math.cos(yaw);
		const rx = Math.cos(yaw);
		const rz = -Math.sin(yaw);
		samples.push({
			s,
			x,
			z,
			yaw,
			fx,
			fz,
			rx,
			rz
		});
		const curve = .105 * Math.sin(s * .016 + .55) + .068 * Math.sin(s * .029 + 1.6) + .036 * Math.sin(s * .047 + .2);
		yaw += curve;
		x += fx * PATH_DS;
		z += fz * PATH_DS;
		s += PATH_DS;
	}
	return samples;
}
function sampleAt(path, s) {
	const clamped = Math.max(0, Math.min(1798 * PATH_DS, s));
	const i = Math.min(1798, Math.max(0, Math.floor(clamped / PATH_DS)));
	const a = path[i];
	const b = path[i + 1];
	const span = b.s - a.s || PATH_DS;
	const t = (clamped - a.s) / span;
	const dx = b.x - a.x;
	const dz = b.z - a.z;
	const len = Math.hypot(dx, dz) || 1;
	const fx = dx / len;
	const fz = dz / len;
	return {
		s: clamped,
		x: a.x + dx * t,
		z: a.z + dz * t,
		yaw: a.yaw + (b.yaw - a.yaw) * t,
		fx,
		fz,
		rx: -fz,
		rz: fx
	};
}
function nearestOnPath(path, x, z, hintS) {
	const hint = Math.round(hintS / PATH_DS);
	let bestI = Math.max(0, Math.min(1799, hint));
	let bestD = Infinity;
	const lo = Math.max(0, hint - 10);
	const hi = Math.min(1799, hint + 14);
	for (let i = lo; i <= hi; i++) {
		const dx = path[i].x - x;
		const dz = path[i].z - z;
		const d = dx * dx + dz * dz;
		if (d < bestD) {
			bestD = d;
			bestI = i;
		}
	}
	const p = path[bestI];
	const along = (x - p.x) * p.fx + (z - p.z) * p.fz;
	return sampleAt(path, p.s + along);
}
function makeRoadTexture() {
	const c = document.createElement("canvas");
	c.width = 256;
	c.height = 256;
	const g = c.getContext("2d");
	g.fillStyle = "#4c4d52";
	g.fillRect(0, 0, 256, 256);
	for (let i = 0; i < 900; i++) {
		g.fillStyle = `rgba(255,255,255,${Math.random() * .07})`;
		g.fillRect(Math.random() * 256, Math.random() * 256, 2, 1);
	}
	g.fillStyle = "#f4f1e6";
	g.fillRect(0, 0, 7, 256);
	g.fillRect(249, 0, 7, 256);
	g.fillRect(82, 0, 5, 256);
	g.fillRect(169, 0, 5, 256);
	g.fillStyle = "#4c4d52";
	for (let y = 0; y < 256; y += 40) g.fillRect(80, y + 18, 9, 18), g.fillRect(167, y + 18, 9, 18);
	const t = new CanvasTexture(c);
	t.wrapS = ClampToEdgeWrapping;
	t.wrapT = RepeatWrapping;
	t.anisotropy = 4;
	t.colorSpace = SRGBColorSpace;
	t.repeat.set(1, 1);
	return t;
}
function makeGrassTexture() {
	const c = document.createElement("canvas");
	c.width = c.height = 128;
	const g = c.getContext("2d");
	g.fillStyle = "#3d3a2a";
	g.fillRect(0, 0, 128, 128);
	for (let i = 0; i < 400; i++) {
		g.fillStyle = `rgba(255,255,255,${Math.random() * .08})`;
		g.fillRect(Math.random() * 128, Math.random() * 128, 2, 2);
	}
	const t = new CanvasTexture(c);
	t.wrapS = t.wrapT = RepeatWrapping;
	t.anisotropy = 4;
	t.colorSpace = SRGBColorSpace;
	t.repeat.set(4, 18);
	return t;
}
function makeStripeTexture() {
	const c = document.createElement("canvas");
	c.width = 128;
	c.height = 128;
	const g = c.getContext("2d");
	g.fillStyle = "#d8d4cc";
	g.fillRect(0, 0, 128, 128);
	g.translate(64, 64);
	g.rotate(-.7);
	g.translate(-64, -64);
	for (let i = -2; i < 10; i++) {
		g.fillStyle = i % 2 === 0 ? "#f97316" : "#f4f4f5";
		g.fillRect(i * 18, -40, 12, 220);
	}
	const t = new CanvasTexture(c);
	t.colorSpace = SRGBColorSpace;
	t.wrapS = t.wrapT = RepeatWrapping;
	return t;
}
function makeSmokeTexture() {
	const c = document.createElement("canvas");
	c.width = c.height = 64;
	const g = c.getContext("2d");
	const grd = g.createRadialGradient(32, 32, 4, 32, 32, 30);
	grd.addColorStop(0, "rgba(70,70,74,0.55)");
	grd.addColorStop(1, "rgba(70,70,74,0)");
	g.fillStyle = grd;
	g.fillRect(0, 0, 64, 64);
	const t = new CanvasTexture(c);
	t.colorSpace = SRGBColorSpace;
	return t;
}
function makeFacade(kind) {
	const c = document.createElement("canvas");
	c.width = 128;
	c.height = 256;
	const g = c.getContext("2d");
	if (kind === "glass") {
		g.fillStyle = "#141a24";
		g.fillRect(0, 0, 128, 256);
		for (let y = 8; y < 250; y += 14) for (let x = 6; x < 122; x += 14) {
			g.fillStyle = Math.random() > .38 ? `rgba(210, 230, 255, ${.25 + Math.random() * .55})` : "#0c1118";
			g.fillRect(x, y, 9, 9);
		}
	} else if (kind === "brick") {
		g.fillStyle = "#6a3d32";
		g.fillRect(0, 0, 128, 256);
		g.fillStyle = "#5a322a";
		for (let y = 0; y < 256; y += 8) g.fillRect(0, y, 128, 1);
		for (let y = 16; y < 248; y += 22) for (let x = 10; x < 118; x += 22) {
			g.fillStyle = Math.random() > .4 ? "#f3e0a8" : "#1a120e";
			g.fillRect(x, y, 10, 12);
		}
	} else if (kind === "shop") {
		g.fillStyle = "#2a2c34";
		g.fillRect(0, 0, 128, 256);
		g.fillStyle = "#111218";
		g.fillRect(0, 170, 128, 86);
		const signs = [
			"#2dd4bf",
			"#f97316",
			"#60a5fa",
			"#e11d48"
		];
		g.fillStyle = signs[Math.floor(Math.random() * signs.length)];
		g.fillRect(8, 176, 112, 22);
		for (let x = 12; x < 116; x += 28) {
			g.fillStyle = "#f8fafc";
			g.fillRect(x, 208, 18, 36);
		}
		for (let y = 12; y < 160; y += 20) for (let x = 10; x < 118; x += 20) {
			g.fillStyle = Math.random() > .45 ? "#ffe8a3" : "#1a1c22";
			g.fillRect(x, y, 12, 12);
		}
	} else {
		g.fillStyle = "#3b414c";
		g.fillRect(0, 0, 128, 256);
		g.fillStyle = "#2a3038";
		g.fillRect(0, 0, 128, 16);
		for (let y = 22; y < 248; y += 16) for (let x = 8; x < 120; x += 16) {
			g.fillStyle = Math.random() > .35 ? "#9ad4f5" : "#1b2128";
			g.fillRect(x, y, 10, 10);
		}
	}
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	return tex;
}
function makeSignTex(label, bg, fg) {
	const c = document.createElement("canvas");
	c.width = 256;
	c.height = 64;
	const g = c.getContext("2d");
	g.fillStyle = bg;
	g.fillRect(0, 0, 256, 64);
	g.fillStyle = fg;
	g.font = "700 34px Oswald, sans-serif";
	g.textAlign = "center";
	g.textBaseline = "middle";
	g.fillText(label, 128, 34);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	return tex;
}
function addSign(g, tex, y, z, w = 3.4, h = .85) {
	const mat = new MeshBasicMaterial({
		map: tex,
		toneMapped: false,
		side: 2
	});
	const m = new Mesh(new PlaneGeometry(w, h), mat);
	m.position.set(0, y, z);
	g.add(m);
}
function buildCafe() {
	const g = new Group();
	const wall = new MeshStandardMaterial({
		color: 12891290,
		roughness: .7
	});
	const body = new Mesh(new BoxGeometry(9.2, 5.4, 7.2), wall);
	body.position.y = 2.7;
	body.castShadow = true;
	const awning = new Mesh(new BoxGeometry(9.4, .12, 2.2), new MeshStandardMaterial({
		color: 11805464,
		roughness: .55
	}));
	awning.position.set(0, 3.15, -3.9);
	const win = new MeshStandardMaterial({
		color: 16770992,
		emissive: 16762218,
		emissiveIntensity: .7
	});
	const w1 = new Mesh(new BoxGeometry(2.2, 1.6, .12), win);
	w1.position.set(-2.2, 1.7, -3.62);
	const w2 = w1.clone();
	w2.position.x = 2.2;
	g.add(body, awning, w1, w2);
	addSign(g, makeSignTex("CAFE", "#7f1d1d", "#fff7ed"), 4.7, -3.68);
	return g;
}
function buildPetrol() {
	const g = new Group();
	const steel = new MeshStandardMaterial({
		color: 10133672,
		metalness: .65,
		roughness: .3
	});
	const canopy = new Mesh(new BoxGeometry(11, .28, 8.5), new MeshStandardMaterial({
		color: 16096779,
		emissive: 16096779,
		emissiveIntensity: .35
	}));
	canopy.position.y = 4.6;
	const pole = new Mesh(new CylinderGeometry(.14, .16, 4.5, 8), steel);
	const pL = pole.clone();
	pL.position.set(-4.2, 2.25, 2);
	const pR = pole.clone();
	pR.position.set(4.2, 2.25, 2);
	const pL2 = pole.clone();
	pL2.position.set(-4.2, 2.25, -2);
	const pR2 = pole.clone();
	pR2.position.set(4.2, 2.25, -2);
	const pumpMat = new MeshStandardMaterial({
		color: 2042163,
		roughness: .45
	});
	const pump = new Mesh(new BoxGeometry(.7, 1.6, .55), pumpMat);
	const a = pump.clone();
	a.position.set(-1.4, .8, 1.2);
	const b = pump.clone();
	b.position.set(1.4, .8, 1.2);
	const glow = new Mesh(new BoxGeometry(10.6, .08, .12), new MeshStandardMaterial({
		color: 16498468,
		emissive: 16498468,
		emissiveIntensity: 2.2
	}));
	glow.position.set(0, 4.48, -4.2);
	g.add(canopy, pL, pR, pL2, pR2, a, b, glow);
	addSign(g, makeSignTex("FUEL", "#111827", "#fbbf24"), 5.05, -4.3, 4.2, .7);
	return g;
}
function buildClub() {
	const g = new Group();
	const wall = new MeshStandardMaterial({
		color: 1315868,
		roughness: .55,
		metalness: .2
	});
	const body = new Mesh(new BoxGeometry(10.5, 8.2, 7.4), wall);
	body.position.y = 4.1;
	body.castShadow = true;
	const neon = new MeshStandardMaterial({
		color: 15485081,
		emissive: 15485081,
		emissiveIntensity: 2.6
	});
	const strip = new Mesh(new BoxGeometry(10.6, .16, .16), neon);
	strip.position.set(0, 6.6, -3.75);
	const strip2 = new Mesh(new BoxGeometry(10.6, .16, .16), new MeshStandardMaterial({
		color: 2282478,
		emissive: 2282478,
		emissiveIntensity: 2.4
	}));
	strip2.position.set(0, 2.4, -3.75);
	const door = new Mesh(new BoxGeometry(1.6, 2.4, .12), new MeshStandardMaterial({
		color: 723728,
		emissive: 4988309,
		emissiveIntensity: .5
	}));
	door.position.set(0, 1.2, -3.75);
	g.add(body, strip, strip2, door);
	addSign(g, makeSignTex("CLUB", "#4c0519", "#fb7185"), 7.4, -3.8);
	return g;
}
function buildRestaurant() {
	const g = new Group();
	const wall = new MeshStandardMaterial({
		color: 5978670,
		roughness: .72
	});
	const body = new Mesh(new BoxGeometry(10, 6.2, 7.6), wall);
	body.position.y = 3.1;
	body.castShadow = true;
	const win = new MeshStandardMaterial({
		color: 16766881,
		emissive: 16757606,
		emissiveIntensity: .85
	});
	for (const x of [
		-2.8,
		0,
		2.8
	]) {
		const w = new Mesh(new BoxGeometry(2, 1.7, .1), win);
		w.position.set(x, 2.1, -3.85);
		g.add(w);
	}
	const roof = new Mesh(new BoxGeometry(10.4, .25, 8), new MeshStandardMaterial({
		color: 2760988,
		roughness: .8
	}));
	roof.position.y = 6.3;
	g.add(body, roof);
	addSign(g, makeSignTex("EAT", "#7c2d12", "#ffedd5"), 5.55, -3.9);
	return g;
}
function makeRibbon(path, half, y, vScale) {
	const n = path.length;
	const pos = new Float32Array(n * 2 * 3);
	const nrm = new Float32Array(n * 2 * 3);
	const uv = new Float32Array(n * 2 * 2);
	const idx = [];
	for (let i = 0; i < n; i++) {
		const p = path[i];
		const lx = p.x - p.rx * half;
		const lz = p.z - p.rz * half;
		const rx = p.x + p.rx * half;
		const rz = p.z + p.rz * half;
		const o = i * 6;
		pos[o] = lx;
		pos[o + 1] = y;
		pos[o + 2] = lz;
		pos[o + 3] = rx;
		pos[o + 4] = y;
		pos[o + 5] = rz;
		nrm[o + 1] = 1;
		nrm[o + 4] = 1;
		const v = i * PATH_DS / vScale;
		uv[i * 4] = 0;
		uv[i * 4 + 1] = v;
		uv[i * 4 + 2] = 1;
		uv[i * 4 + 3] = v;
		if (i < n - 1) {
			const a = i * 2;
			idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
		}
	}
	const geo = new BufferGeometry();
	geo.setAttribute("position", new BufferAttribute(pos, 3));
	geo.setAttribute("normal", new BufferAttribute(nrm, 3));
	geo.setAttribute("uv", new BufferAttribute(uv, 2));
	geo.setIndex(idx);
	geo.computeBoundingSphere();
	return geo;
}
function makeCarEnv() {
	const c = document.createElement("canvas");
	c.width = 256;
	c.height = 128;
	const g = c.getContext("2d");
	const grd = g.createLinearGradient(0, 0, 0, 128);
	grd.addColorStop(0, "#5a78b4");
	grd.addColorStop(.42, "#f4a06a");
	grd.addColorStop(.55, "#c45c2d");
	grd.addColorStop(1, "#2a1810");
	g.fillStyle = grd;
	g.fillRect(0, 0, 256, 128);
	const tex = new CanvasTexture(c);
	tex.mapping = 303;
	tex.colorSpace = SRGBColorSpace;
	return tex;
}
var CAR_ENV = null;
function carEnv() {
	if (!CAR_ENV) CAR_ENV = makeCarEnv();
	return CAR_ENV;
}
function carMats(color) {
	return {
		body: new MeshPhysicalMaterial({
			color,
			metalness: .86,
			roughness: .22,
			clearcoat: .85,
			clearcoatRoughness: .18,
			envMap: carEnv(),
			envMapIntensity: 1.15
		}),
		dark: new MeshStandardMaterial({
			color: 1118484,
			metalness: .55,
			roughness: .38
		}),
		chrome: new MeshStandardMaterial({
			color: 15265524,
			metalness: 1,
			roughness: .08,
			envMap: carEnv(),
			envMapIntensity: 1.4
		}),
		black: new MeshStandardMaterial({
			color: 657932,
			metalness: .4,
			roughness: .45
		}),
		stripe: new MeshStandardMaterial({
			color: 16053493,
			metalness: .35,
			roughness: .32
		}),
		glass: new MeshPhysicalMaterial({
			color: 9356520,
			metalness: .2,
			roughness: .04,
			transparent: true,
			opacity: .55,
			envMap: carEnv(),
			envMapIntensity: 1.2
		}),
		head: new MeshStandardMaterial({
			color: 16774358,
			emissive: 16773570,
			emissiveIntensity: 1.4
		}),
		tail: new MeshStandardMaterial({
			color: 14753096,
			emissive: 16723285,
			emissiveIntensity: 1.5
		}),
		tire: new MeshStandardMaterial({
			color: 1381656,
			roughness: .9
		}),
		disc: new MeshStandardMaterial({
			color: 3816e3,
			metalness: .7,
			roughness: .3
		})
	};
}
function addPart(g, w, h, d, mat, x, y, z, rx = 0, ry = 0, rz = 0) {
	const m = new Mesh(new BoxGeometry(w, h, d), mat);
	m.position.set(x, y, z);
	m.rotation.set(rx, ry, rz);
	m.castShadow = true;
	g.add(m);
	return m;
}
function addWheels(g, m, track, zF, zR, y = .34, r = .34) {
	const wheelGeo = new CylinderGeometry(r, r, .28, 22);
	wheelGeo.rotateZ(Math.PI / 2);
	const rimGeo = new TorusGeometry(r * .62, .04, 8, 18);
	rimGeo.rotateY(Math.PI / 2);
	const discGeo = new CylinderGeometry(r * .42, r * .42, .08, 16);
	discGeo.rotateZ(Math.PI / 2);
	for (const pos of [
		[
			-track,
			y,
			zF
		],
		[
			track,
			y,
			zF
		],
		[
			-track,
			y,
			zR
		],
		[
			track,
			y,
			zR
		]
	]) {
		const w = new Mesh(wheelGeo, m.tire);
		w.position.set(...pos);
		w.castShadow = true;
		const rim = new Mesh(rimGeo, m.chrome);
		rim.position.set(...pos);
		const disc = new Mesh(discGeo, m.disc);
		disc.position.set(...pos);
		g.add(w, rim, disc);
		const spokeGeo = new BoxGeometry(.035, r * .7, .02);
		for (let s = 0; s < 5; s++) {
			const spoke = new Mesh(spokeGeo, m.chrome);
			spoke.position.set(...pos);
			spoke.rotation.x = s / 5 * Math.PI;
			g.add(spoke);
		}
	}
}
function addBlobShadow(g, w, d) {
	const sh = new Mesh(new CircleGeometry(Math.max(w, d) * .42, 16), new MeshBasicMaterial({
		color: 0,
		transparent: true,
		opacity: .38,
		depthWrite: false
	}));
	sh.rotation.x = -Math.PI / 2;
	sh.position.y = .02;
	sh.scale.set(w * .55, d * .28, 1);
	g.add(sh);
}
function attachHero(g) {
	const beam = new SpotLight(16773584, 22, 62, .38, .4, 1.1);
	beam.position.set(-.5, .55, -2.15);
	beam.target.position.set(-.5, .12, -20);
	g.add(beam, beam.target);
	const beamR = new SpotLight(16773584, 22, 62, .38, .4, 1.1);
	beamR.position.set(.5, .55, -2.15);
	beamR.target.position.set(.5, .12, -20);
	g.add(beamR, beamR.target);
	const red = makeFlameMaterial(new Color(16726832));
	const blue = makeFlameMaterial(new Color(3900150));
	const cone = new ConeGeometry(.12, .88, 8, 1, true);
	cone.rotateX(-Math.PI / 2);
	const mk = (mat, x) => {
		const mesh = new Mesh(cone, mat);
		mesh.position.set(x, .34, 2.18);
		mesh.visible = false;
		g.add(mesh);
		return mesh;
	};
	const flames = {
		redL: mk(red, -.42),
		redR: mk(red, .42),
		blueL: mk(blue, -.42),
		blueR: mk(blue, .42),
		red,
		blue,
		glow: new PointLight(16731450, 0, 8, 2)
	};
	flames.glow.position.set(0, .4, 2.1);
	g.add(flames.glow);
	const under = new Mesh(new BoxGeometry(1.35, .04, 2.4), new MeshStandardMaterial({
		color: 2282478,
		emissive: 2282478,
		emissiveIntensity: 2.8
	}));
	under.position.set(0, .12, .1);
	g.add(under);
	g.userData.flames = flames;
}
function buildCar(color, hero = false, style = "apex") {
	const g = new Group();
	const m = carMats(color);
	if (style === "carbon") {
		addPart(g, 1.92, .1, 4.2, m.dark, 0, .28, .05);
		addPart(g, 1.88, .26, 4.15, m.body, 0, .46, .04);
		addPart(g, 1.62, .14, 1.4, m.body, 0, .5, -1.72, .12);
		const cabin = addPart(g, 1.28, .3, 1.35, m.glass, 0, .78, .22, .18);
		cabin.castShadow = false;
		addPart(g, 2.08, .07, .58, m.dark, 0, 1.02, 2.02);
		addPart(g, .24, .2, .72, m.black, -1.02, .46, -.35);
		addPart(g, .24, .2, .72, m.black, 1.02, .46, -.35);
		addPart(g, .58, .1, .1, m.head, -.58, .48, -2.4);
		addPart(g, .58, .1, .1, m.head, .58, .48, -2.4);
		addPart(g, .55, .09, .08, m.tail, -.62, .48, 2.16);
		addPart(g, .55, .09, .08, m.tail, .62, .48, 2.16);
		addWheels(g, m, 1, -1.32, 1.36, .33, .33);
		addBlobShadow(g, 2.1, 4.3);
	} else if (style === "wide") {
		addPart(g, 2.12, .12, 4.05, m.dark, 0, .3, 0);
		addPart(g, 2.05, .36, 3.95, m.body, 0, .56, .04);
		addPart(g, .34, .26, 1.15, m.body, -1.16, .5, -1.18);
		addPart(g, .34, .26, 1.15, m.body, 1.16, .5, -1.18);
		addPart(g, .34, .26, 1.15, m.body, -1.16, .5, 1.22);
		addPart(g, .34, .26, 1.15, m.body, 1.16, .5, 1.22);
		addPart(g, 1.5, .38, 1.48, m.glass, 0, .98, .02, .1);
		addPart(g, .16, .03, 3.9, m.stripe, -.18, .76, 0);
		addPart(g, .16, .03, 3.9, m.stripe, .18, .76, 0);
		addPart(g, 2.18, .1, .52, m.dark, 0, 1.2, 1.92);
		addPart(g, .42, .14, .1, m.head, -.72, .52, -2.08);
		addPart(g, .42, .14, .1, m.head, .72, .52, -2.08);
		addPart(g, .44, .12, .08, m.tail, -.72, .52, 2.08);
		addPart(g, .44, .12, .08, m.tail, .72, .52, 2.08);
		addWheels(g, m, 1.12, -1.26, 1.3, .36, .36);
		addBlobShadow(g, 2.3, 4.2);
	} else if (style === "roadster") {
		addPart(g, 1.7, .1, 3.8, m.dark, 0, .28, 0);
		addPart(g, 1.68, .28, 3.72, m.body, 0, .48, 0);
		addPart(g, 1.52, .16, 1.08, m.body, 0, .5, -1.62, .08);
		addPart(g, 1.38, .3, .08, m.glass, 0, .8, -.52, -.35);
		const hoop = new Mesh(new TorusGeometry(.3, .035, 8, 16, Math.PI), m.chrome);
		hoop.rotation.z = Math.PI / 2;
		hoop.position.set(0, .84, .48);
		g.add(hoop);
		addPart(g, 1.08, .1, .85, m.black, 0, .58, .12);
		addPart(g, .36, .1, .08, m.head, -.52, .48, -2.12);
		addPart(g, .36, .1, .08, m.head, .52, .48, -2.12);
		addPart(g, .32, .1, .08, m.tail, -.5, .48, 1.95);
		addPart(g, .32, .1, .08, m.tail, .5, .48, 1.95);
		addWheels(g, m, .92, -1.2, 1.2, .32, .33);
		addBlobShadow(g, 1.9, 4);
	} else if (style === "night") {
		addPart(g, 1.8, .1, 4.45, m.dark, 0, .3, 0);
		addPart(g, 1.78, .32, 4.4, m.body, 0, .52, .02);
		addPart(g, 1.44, .38, 1.85, m.glass, 0, .9, .08, .06);
		addPart(g, 1.78, .04, .1, m.chrome, 0, .7, -2.24);
		addPart(g, 1.68, .05, .3, m.dark, 0, .96, 2.14);
		addPart(g, .66, .08, .08, m.head, -.52, .52, -2.26);
		addPart(g, .66, .08, .08, m.head, .52, .52, -2.26);
		addPart(g, .72, .09, .08, m.tail, -.48, .52, 2.26);
		addPart(g, .72, .09, .08, m.tail, .48, .52, 2.26);
		addWheels(g, m, .96, -1.38, 1.38, .34, .34);
		addBlobShadow(g, 2, 4.5);
	} else {
		addPart(g, 1.76, .1, 4.15, m.dark, 0, .3, 0);
		addPart(g, 1.78, .34, 3.85, m.body, 0, .54, .08);
		addPart(g, 1.62, .18, 1.28, m.body, 0, .56, -1.62, .1);
		addPart(g, 1.7, .16, .32, m.body, 0, .46, -2.12);
		addPart(g, 1.42, .4, 1.5, m.glass, 0, .96, .1, .12);
		addPart(g, 1.22, .06, 1.22, m.body, 0, 1.18, .12);
		addPart(g, .08, .16, .42, m.black, -.94, .54, -.82);
		addPart(g, .08, .16, .42, m.black, .94, .54, -.82);
		addPart(g, .38, .32, .06, m.chrome, -.22, .52, -2.26);
		addPart(g, .38, .32, .06, m.chrome, .22, .52, -2.26);
		addPart(g, .32, .28, .08, m.black, -.22, .52, -2.3);
		addPart(g, .32, .28, .08, m.black, .22, .52, -2.3);
		addPart(g, .44, .08, .08, m.head, -.7, .56, -2.26);
		addPart(g, .44, .08, .08, m.head, .7, .56, -2.26);
		addPart(g, .08, .2, .08, m.head, -.88, .48, -2.26);
		addPart(g, .08, .2, .08, m.head, .88, .48, -2.26);
		addPart(g, 1.66, .07, .36, m.dark, 0, 1.08, 1.92);
		addPart(g, .4, .1, .08, m.tail, -.58, .52, 2.12);
		addPart(g, .4, .1, .08, m.tail, .58, .52, 2.12);
		const ex = new Mesh(new CylinderGeometry(.05, .05, .22, 10), m.chrome);
		ex.rotation.x = Math.PI / 2;
		ex.position.set(-.32, .28, 2.18);
		const ex2 = ex.clone();
		ex2.position.x = .32;
		g.add(ex, ex2);
		addWheels(g, m, .96, -1.28, 1.3, .34, .34);
		addBlobShadow(g, 2, 4.3);
	}
	addPart(g, .28, .1, .14, m.chrome, -.98, .8, -.42);
	addPart(g, .28, .1, .14, m.chrome, .98, .8, -.42);
	if (hero) attachHero(g);
	return g;
}
function buildJerseyBarrier(stripeTex) {
	const g = new Group();
	const conc = new MeshStandardMaterial({
		color: 13025976,
		roughness: .88,
		metalness: .04
	});
	const stripe = new MeshStandardMaterial({
		map: stripeTex,
		roughness: .52,
		metalness: .08
	});
	const rust = new MeshStandardMaterial({
		color: 7033668,
		roughness: .9,
		metalness: .1
	});
	const base = new Mesh(new BoxGeometry(2.35, .26, 1.2), conc);
	base.position.y = .13;
	base.castShadow = true;
	const wall = new Mesh(new BoxGeometry(2.28, .92, .52), stripe);
	wall.position.y = .7;
	wall.castShadow = true;
	const cap = new Mesh(new BoxGeometry(2.3, .1, .4), conc);
	cap.position.y = 1.18;
	const post = new Mesh(new BoxGeometry(.12, .7, .12), rust);
	const pL = post.clone();
	pL.position.set(-1.05, .55, .42);
	const pR = post.clone();
	pR.position.set(1.05, .55, .42);
	g.add(base, wall, cap, pL, pR);
	return g;
}
function buildWreck(color, tilt, smokeTex) {
	const g = new Group();
	const car = buildCar(color, false);
	car.rotation.z = tilt;
	car.rotation.x = .12;
	car.position.y = .28;
	g.add(car);
	const scrap = new MeshStandardMaterial({
		color: 4931640,
		roughness: .92,
		metalness: .2
	});
	const hood = new Mesh(new BoxGeometry(.7, .08, .9), scrap);
	hood.position.set(-.85, .16, -.9);
	hood.rotation.set(.4, .5, .8);
	hood.castShadow = true;
	const bumper = new Mesh(new BoxGeometry(1.1, .14, .28), scrap);
	bumper.position.set(.55, .12, 1.5);
	bumper.rotation.y = .35;
	g.add(hood, bumper);
	const smokeMat = new SpriteMaterial({
		map: smokeTex,
		transparent: true,
		depthWrite: false,
		opacity: .7
	});
	const smoke = new Sprite(smokeMat);
	smoke.position.set(.1, 1.35, .2);
	smoke.scale.set(1.8, 1.8, 1);
	g.add(smoke);
	g.userData.smoke = smoke;
	return g;
}
function createEngineAudio() {
	let ctx = null;
	let osc = null;
	let osc2 = null;
	let filter = null;
	let gain = null;
	let dead = false;
	const ensure = () => {
		if (dead) return;
		if (ctx) {
			if (ctx.state === "suspended") ctx.resume();
			return;
		}
		ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
		const master = ctx.createGain();
		master.gain.value = .2;
		master.connect(ctx.destination);
		gain = ctx.createGain();
		gain.gain.value = 0;
		filter = ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 700;
		filter.Q.value = .9;
		osc = ctx.createOscillator();
		osc.type = "sawtooth";
		osc.frequency.value = 52;
		osc2 = ctx.createOscillator();
		osc2.type = "square";
		osc2.frequency.value = 104;
		const g2 = ctx.createGain();
		g2.gain.value = .12;
		osc.connect(filter);
		osc2.connect(g2);
		g2.connect(filter);
		filter.connect(gain);
		gain.connect(master);
		osc.start();
		osc2.start();
		if (ctx.state === "suspended") ctx.resume();
	};
	return {
		unlock: ensure,
		update(speed, boosting, live, throttle) {
			if (dead || !ctx || !osc || !osc2 || !filter || !gain) return;
			if (ctx.state === "suspended") ctx.resume();
			const rpm = 50 + speed * 10.5 + (boosting ? 48 : 0);
			const t = ctx.currentTime;
			osc.frequency.setTargetAtTime(rpm, t, .06);
			osc2.frequency.setTargetAtTime(rpm * 2.05, t, .06);
			filter.frequency.setTargetAtTime(480 + speed * 38 + (boosting ? 700 : 0), t, .08);
			const vol = live ? .03 + Math.min(.18, speed * .007) + (throttle ? .04 : 0) + (boosting ? .06 : 0) : 0;
			gain.gain.setTargetAtTime(vol, t, .05);
		},
		stop() {
			if (!gain || !ctx) return;
			gain.gain.setTargetAtTime(0, ctx.currentTime, .04);
		},
		dispose() {
			dead = true;
			try {
				osc?.stop();
				osc2?.stop();
				ctx?.close();
			} catch {}
			ctx = null;
		}
	};
}
function lerpAngle(a, b, k) {
	let d = b - a;
	while (d > Math.PI) d -= Math.PI * 2;
	while (d < -Math.PI) d += Math.PI * 2;
	return a + d * k;
}
function hitS(as, alat, al, aw, bs, blat, bl, bw) {
	return Math.abs(as - bs) < (al + bl) * .5 && Math.abs(alat - blat) < (aw + bw) * .5;
}
function createGame(canvas, onHud, settings) {
	const path = buildPath();
	const audio = createEngineAudio();
	const maxS = 1788 * PATH_DS;
	const tuning = MODE_TUNING[settings.mode];
	const speedMul = SPEED_INFO[settings.speed].mul;
	const carSpec = carById(settings.car);
	const paint = paintById(settings.paint);
	const shaderTime = { value: 0 };
	const renderer = new WebGLRenderer({
		canvas,
		antialias: true,
		powerPreference: "high-performance"
	});
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = 1;
	renderer.toneMapping = 4;
	renderer.toneMappingExposure = 1.05;
	renderer.outputColorSpace = SRGBColorSpace;
	const scene = new Scene();
	scene.background = new Color(tuning.fog);
	scene.fog = new Fog(tuning.fog, tuning.fogNear, tuning.fogFar);
	const camera = new PerspectiveCamera(62, 1, .2, 900);
	camera.position.set(0, 2.1, 7);
	scene.add(new HemisphereLight(16763040, 3810328, .58));
	const sun = new DirectionalLight(16756848, 1.35);
	sun.position.set(70, 22, 36);
	sun.castShadow = true;
	sun.shadow.mapSize.set(1024, 1024);
	sun.shadow.camera.near = 8;
	sun.shadow.camera.far = 200;
	sun.shadow.camera.left = -55;
	sun.shadow.camera.right = 55;
	sun.shadow.camera.top = 55;
	sun.shadow.camera.bottom = -55;
	sun.shadow.bias = -8e-4;
	scene.add(sun);
	scene.add(sun.target);
	const skyMat = makeSkyMaterial();
	const sky = new Mesh(new SphereGeometry(720, 32, 20), skyMat);
	scene.add(sky);
	const sunOrb = new Mesh(new SphereGeometry(22, 20, 16), new MeshBasicMaterial({
		color: 16769192,
		fog: false
	}));
	const sunHalo = new Mesh(new SphereGeometry(48, 16, 12), new MeshBasicMaterial({
		color: 16747066,
		transparent: true,
		opacity: .12,
		fog: false,
		depthWrite: false
	}));
	scene.add(sunOrb, sunHalo);
	function makeCloudTex() {
		const c = document.createElement("canvas");
		c.width = 512;
		c.height = 256;
		const g = c.getContext("2d");
		g.clearRect(0, 0, 512, 256);
		for (const [x, y, r] of [
			[
				160,
				150,
				70
			],
			[
				230,
				140,
				86
			],
			[
				310,
				155,
				74
			],
			[
				200,
				118,
				48
			],
			[
				270,
				112,
				52
			],
			[
				250,
				168,
				40
			]
		]) {
			const shade = g.createRadialGradient(x, y + 10, 8, x, y, r);
			shade.addColorStop(0, "rgba(90,70,78,0.35)");
			shade.addColorStop(1, "rgba(90,70,78,0)");
			g.fillStyle = shade;
			g.beginPath();
			g.ellipse(x, y + 8, r * .95, r * .55, 0, 0, Math.PI * 2);
			g.fill();
			const lit = g.createRadialGradient(x - r * .2, y - r * .25, 4, x, y, r);
			lit.addColorStop(0, "rgba(255,252,248,0.95)");
			lit.addColorStop(.45, "rgba(255,214,176,0.72)");
			lit.addColorStop(1, "rgba(255,170,120,0)");
			g.fillStyle = lit;
			g.beginPath();
			g.ellipse(x, y, r, r * .62, 0, 0, Math.PI * 2);
			g.fill();
		}
		const tex = new CanvasTexture(c);
		tex.colorSpace = SRGBColorSpace;
		return tex;
	}
	const cloudTex = makeCloudTex();
	const cloudMat = new MeshBasicMaterial({
		map: cloudTex,
		transparent: true,
		depthWrite: false,
		fog: false,
		opacity: .92,
		side: 2
	});
	const cloudLayer = [];
	for (let i = 0; i < 8; i++) {
		const mesh = new Mesh(new PlaneGeometry(140 + i % 3 * 30, 62), cloudMat);
		mesh.position.set(i % 4 * 90 - 140, 62 + i % 3 * 10, -90 - i * 28);
		scene.add(mesh);
		cloudLayer.push(mesh);
	}
	const asphalt = makeRoadTexture();
	const grassTex = makeGrassTexture();
	const glassTex = makeFacade("glass");
	const brickTex = makeFacade("brick");
	const shopTex = makeFacade("shop");
	const officeTex = makeFacade("office");
	const roadMat = new MeshStandardMaterial({
		map: asphalt,
		roughness: .22,
		metalness: .42,
		polygonOffset: true,
		polygonOffsetFactor: -1,
		polygonOffsetUnits: -1
	});
	patchRoadShader(roadMat, shaderTime);
	const grassMat = new MeshStandardMaterial({
		map: grassTex,
		roughness: 1,
		metalness: 0,
		depthWrite: true
	});
	const padMat = new MeshStandardMaterial({
		color: 3462041,
		emissive: 3462041,
		emissiveIntensity: .5,
		roughness: .35
	});
	const stripeTex = makeStripeTexture();
	const smokeTex = makeSmokeTexture();
	const stoneMat = new MeshStandardMaterial({
		color: 3816002,
		roughness: .78,
		metalness: .08
	});
	const deckMat = new MeshStandardMaterial({
		map: officeTex,
		roughness: .5,
		metalness: .18
	});
	const glassMat = new MeshStandardMaterial({
		map: glassTex,
		roughness: .22,
		metalness: .55,
		emissive: 726304,
		emissiveIntensity: .35
	});
	const brickMat = new MeshStandardMaterial({
		map: brickTex,
		roughness: .78,
		metalness: .08
	});
	const shopMat = new MeshStandardMaterial({
		map: shopTex,
		roughness: .55,
		metalness: .12,
		emissive: 1118484,
		emissiveIntensity: .25
	});
	const officeMat = new MeshStandardMaterial({
		map: officeTex,
		roughness: .4,
		metalness: .25,
		emissive: 659992,
		emissiveIntensity: .2
	});
	const grassMesh = new Mesh(makeRibbon(path, 38, -.04, 28), grassMat);
	grassMesh.receiveShadow = true;
	grassMesh.frustumCulled = false;
	const roadMesh = new Mesh(makeRibbon(path, 9.1, .02, 14), roadMat);
	roadMesh.receiveShadow = true;
	roadMesh.frustumCulled = false;
	scene.add(grassMesh, roadMesh);
	const dummy = new Object3D();
	const railMat = new MeshStandardMaterial({
		color: 14146531,
		metalness: .84,
		roughness: .26
	});
	const railGlow = new MeshStandardMaterial({
		color: 6809849,
		emissive: 2282478,
		emissiveIntensity: 2.4
	});
	const railN = 420;
	const rails = new InstancedMesh(new BoxGeometry(PATH_DS * 3.9, .38, .14), railMat, railN);
	const posts = new InstancedMesh(new BoxGeometry(.1, .8, .1), railMat, railN);
	const glowRails = new InstancedMesh(new BoxGeometry(PATH_DS * 3.9, .05, .06), railGlow, railN);
	rails.frustumCulled = false;
	posts.frustumCulled = false;
	glowRails.frustumCulled = false;
	let ri = 0;
	for (let i = 6; i < 1792 && ri < 419; i += 4) {
		const pth = path[i];
		for (const side of [-1, 1]) {
			const dist = 9.02;
			dummy.scale.set(1, 1, 1);
			dummy.rotation.set(0, pth.yaw, 0);
			dummy.position.set(pth.x + pth.rx * side * dist, .52, pth.z + pth.rz * side * dist);
			dummy.updateMatrix();
			rails.setMatrixAt(ri, dummy.matrix);
			dummy.position.y = .4;
			dummy.updateMatrix();
			posts.setMatrixAt(ri, dummy.matrix);
			dummy.position.y = .74;
			dummy.updateMatrix();
			glowRails.setMatrixAt(ri, dummy.matrix);
			ri += 1;
		}
	}
	rails.count = ri;
	posts.count = ri;
	glowRails.count = ri;
	rails.instanceMatrix.needsUpdate = true;
	posts.instanceMatrix.needsUpdate = true;
	glowRails.instanceMatrix.needsUpdate = true;
	scene.add(rails, posts, glowRails);
	const bGeo = new BoxGeometry(1, 1, 1);
	function scatter(mat, count, stride, offset, h0, hSpan, w0, d0, dist0) {
		const mesh = new InstancedMesh(bGeo, mat, count);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.frustumCulled = false;
		let n = 0;
		for (let i = 8 + offset; i < 1792 && n < count; i += stride) {
			const p = path[i];
			const side = n % 2 === 0 ? -1 : 1;
			const h = h0 + n % 5 * hSpan;
			const w = w0 + n % 3;
			const d = d0 + n % 2;
			const dist = dist0 + n % 4 * 1.5;
			dummy.position.set(p.x + p.rx * side * dist, h / 2, p.z + p.rz * side * dist);
			dummy.scale.set(w, h, d);
			dummy.rotation.set(0, p.yaw, 0);
			dummy.updateMatrix();
			mesh.setMatrixAt(n, dummy.matrix);
			n += 1;
		}
		mesh.count = n;
		mesh.instanceMatrix.needsUpdate = true;
		scene.add(mesh);
		return mesh;
	}
	scatter(glassMat, 48, 18, 0, 28, 5.5, 9, 9, 24);
	scatter(brickMat, 70, 12, 4, 14, 2.4, 10, 8, 18);
	scatter(shopMat, 90, 8, 5, 7.5, 1, 12, 9, 15.4);
	scatter(officeMat, 56, 14, 8, 20, 3.2, 8, 10, 21);
	const poleGeo = new CylinderGeometry(.07, .1, 6.8, 6);
	const headGeo = new BoxGeometry(1.15, .16, .36);
	const poleMat = new MeshStandardMaterial({
		color: 1842210,
		metalness: .7,
		roughness: .35
	});
	const glowMat = new MeshStandardMaterial({
		color: 16769704,
		emissive: 16765065,
		emissiveIntensity: 4.2,
		roughness: .3
	});
	const lampN = 520;
	const poles = new InstancedMesh(poleGeo, poleMat, lampN);
	const heads = new InstancedMesh(headGeo, glowMat, lampN);
	poles.frustumCulled = false;
	heads.frustumCulled = false;
	const lampSpot = [];
	let li = 0;
	for (let i = 6; i < 1792 && li < 519; i += 5) {
		const p = path[i];
		dummy.scale.set(1, 1, 1);
		dummy.rotation.set(0, p.yaw, 0);
		for (const side of [-1, 1]) {
			const dist = 11.15;
			dummy.position.set(p.x + p.rx * side * dist, 3.4, p.z + p.rz * side * dist);
			dummy.updateMatrix();
			poles.setMatrixAt(li, dummy.matrix);
			dummy.position.set(p.x + p.rx * side * 10.75, 6.85, p.z + p.rz * side * 10.75);
			dummy.updateMatrix();
			heads.setMatrixAt(li, dummy.matrix);
			lampSpot.push({
				x: dummy.position.x,
				y: 6.7,
				z: dummy.position.z
			});
			li += 1;
		}
	}
	poles.count = li;
	heads.count = li;
	poles.instanceMatrix.needsUpdate = true;
	heads.instanceMatrix.needsUpdate = true;
	scene.add(poles, heads);
	const lampLights = [
		0,
		1,
		2,
		3,
		4,
		5
	].map((i) => {
		const l = new PointLight(i % 2 ? 10151679 : 16766624, 8.4, 26, 1.6);
		scene.add(l);
		return l;
	});
	const landmarkBuilders = [
		buildCafe,
		buildPetrol,
		buildClub,
		buildRestaurant
	];
	for (let i = 18, n = 0; i < 1780; i += 16, n += 1) {
		const p = path[i];
		const side = n % 2 === 0 ? 1 : -1;
		const mesh = landmarkBuilders[n % 4]();
		const dist = 14.8;
		mesh.position.set(p.x + p.rx * side * dist, 0, p.z + p.rz * side * dist);
		mesh.lookAt(p.x, 0, p.z);
		scene.add(mesh);
	}
	function makeBillboard(label, bg, fg, neon) {
		const g = new Group();
		const pole = new Mesh(new CylinderGeometry(.12, .16, 7.2, 6), new MeshStandardMaterial({
			color: 1710626,
			metalness: .6
		}));
		pole.position.y = 3.6;
		const tex = makeSignTex(label, bg, fg);
		const board = new Mesh(new PlaneGeometry(6.4, 2.2), new MeshBasicMaterial({
			map: tex,
			toneMapped: false,
			side: 2
		}));
		board.position.y = 8.1;
		const trim = new Mesh(new BoxGeometry(6.6, 2.4, .12), new MeshStandardMaterial({
			color: neon,
			emissive: neon,
			emissiveIntensity: 1.6
		}));
		trim.position.y = 8.1;
		g.add(pole, trim, board);
		return g;
	}
	const ads = [
		[
			"NITRO",
			"#111827",
			"#67e8f9",
			2282478
		],
		[
			"EAT 24",
			"#7c2d12",
			"#ffedd5",
			16347926
		],
		[
			"CLUB X",
			"#4c0519",
			"#fb7185",
			15485081
		],
		[
			"FUEL+",
			"#111827",
			"#fbbf24",
			16096779
		]
	];
	for (let i = 40, n = 0; i < 1780; i += 36, n += 1) {
		const p = path[i];
		const side = n % 2 === 0 ? -1 : 1;
		const ad = ads[n % ads.length];
		const mesh = makeBillboard(ad[0], ad[1], ad[2], ad[3]);
		mesh.position.set(p.x + p.rx * side * 17.6, 0, p.z + p.rz * side * 17.6);
		mesh.lookAt(p.x, 4, p.z);
		scene.add(mesh);
	}
	const trunkGeo = new CylinderGeometry(.18, .28, 2.4, 6);
	const leafGeo = new ConeGeometry(1.6, 4.2, 7);
	const trunkMat = new MeshStandardMaterial({
		color: 3811868,
		roughness: .9
	});
	const leafMat = new MeshStandardMaterial({
		color: 4872744,
		roughness: .85
	});
	const trunks = new InstancedMesh(trunkGeo, trunkMat, 160);
	const leaves = new InstancedMesh(leafGeo, leafMat, 160);
	trunks.frustumCulled = false;
	leaves.frustumCulled = false;
	let ti = 0;
	for (let i = 14; i < 1788 && ti < 160; i += 11) {
		const p = path[i];
		const side = ti % 2 === 0 ? -1 : 1;
		const dist = 13.2 + ti % 3 * 1.4;
		dummy.scale.set(1, 1, 1);
		dummy.rotation.set(0, 0, 0);
		dummy.position.set(p.x + p.rx * side * dist, 1.2, p.z + p.rz * side * dist);
		dummy.updateMatrix();
		trunks.setMatrixAt(ti, dummy.matrix);
		dummy.position.y = 4.2;
		dummy.updateMatrix();
		leaves.setMatrixAt(ti, dummy.matrix);
		ti += 1;
	}
	trunks.count = ti;
	leaves.count = ti;
	trunks.instanceMatrix.needsUpdate = true;
	leaves.instanceMatrix.needsUpdate = true;
	scene.add(trunks, leaves);
	const markGeo = new PlaneGeometry(.48, 1.45);
	markGeo.rotateX(-Math.PI / 2);
	const markMat = new MeshBasicMaterial({
		color: 1842210,
		transparent: true,
		opacity: .82,
		depthWrite: false
	});
	const MARK_N = 220;
	const marks = new InstancedMesh(markGeo, markMat, MARK_N);
	marks.frustumCulled = false;
	marks.count = 0;
	scene.add(marks);
	let markI = 0;
	let lastMarkS = 0;
	function dropMarks(x, z, yaw, rx, rz) {
		dummy.scale.set(1, 1, 1);
		dummy.rotation.set(0, yaw, 0);
		for (const side of [-.92, .92]) {
			dummy.position.set(x + rx * side, .038, z + rz * side);
			dummy.updateMatrix();
			marks.setMatrixAt(markI % MARK_N, dummy.matrix);
			markI += 1;
		}
		marks.count = Math.min(MARK_N, markI);
		marks.instanceMatrix.needsUpdate = true;
	}
	const driftSmokeTex = makeSmokeTexture();
	const driftSmokeMat = new SpriteMaterial({
		map: driftSmokeTex,
		transparent: true,
		depthWrite: false,
		opacity: 0
	});
	const driftSmokeL = new Sprite(driftSmokeMat);
	const driftSmokeR = new Sprite(driftSmokeMat.clone());
	driftSmokeL.position.set(-.9, .28, 1.35);
	driftSmokeR.position.set(.9, .28, 1.35);
	driftSmokeL.scale.set(1.1, 1.1, 1);
	driftSmokeR.scale.set(1.1, 1.1, 1);
	const pillarGeo = new BoxGeometry(4.2, 13, 7);
	const spanGeo = new BoxGeometry(28, 2.2, 9);
	const midGeo = new BoxGeometry(16, 8, 8);
	const pillars = new InstancedMesh(pillarGeo, stoneMat, 80);
	const spans = new InstancedMesh(spanGeo, deckMat, 40);
	const mids = new InstancedMesh(midGeo, deckMat, 40);
	pillars.castShadow = true;
	spans.castShadow = true;
	mids.castShadow = true;
	pillars.frustumCulled = false;
	spans.frustumCulled = false;
	mids.frustumCulled = false;
	let oi = 0;
	for (let i = 22; i < 1784 && oi < 40; i += 24) {
		const p = path[i];
		dummy.rotation.set(0, p.yaw, 0);
		dummy.scale.set(1, 1, 1);
		dummy.position.set(p.x - p.rx * 14.6, 6.5, p.z - p.rz * 14.6);
		dummy.updateMatrix();
		pillars.setMatrixAt(oi * 2, dummy.matrix);
		dummy.position.set(p.x + p.rx * 14.6, 6.5, p.z + p.rz * 14.6);
		dummy.updateMatrix();
		pillars.setMatrixAt(oi * 2 + 1, dummy.matrix);
		dummy.position.set(p.x, 13.2, p.z);
		dummy.updateMatrix();
		spans.setMatrixAt(oi, dummy.matrix);
		dummy.position.set(p.x, 18.2, p.z);
		dummy.updateMatrix();
		mids.setMatrixAt(oi, dummy.matrix);
		oi += 1;
	}
	pillars.count = oi * 2;
	spans.count = oi;
	mids.count = oi;
	pillars.instanceMatrix.needsUpdate = true;
	spans.instanceMatrix.needsUpdate = true;
	mids.instanceMatrix.needsUpdate = true;
	scene.add(pillars, spans, mids);
	const playerMesh = buildCar(paint.color, true, carSpec.id);
	playerMesh.add(driftSmokeL, driftSmokeR);
	scene.add(playerMesh);
	const traffic = [];
	const trafficStyles = [
		"apex",
		"carbon",
		"wide",
		"roadster",
		"night"
	];
	for (let i = 0; i < tuning.pool; i++) {
		const mesh = buildCar(TRAFFIC_COLORS[i % TRAFFIC_COLORS.length], false, trafficStyles[i % trafficStyles.length]);
		mesh.visible = false;
		scene.add(mesh);
		traffic.push({
			mesh,
			s: 0,
			lane: 0,
			speed: 16,
			alive: false
		});
	}
	const pads = [];
	const padGeo = new BoxGeometry(1.6, .08, 2.2);
	for (let i = 0; i < tuning.padPool; i++) {
		const mesh = new Mesh(padGeo, padMat);
		mesh.visible = false;
		scene.add(mesh);
		pads.push({
			mesh,
			s: 0,
			lane: 0,
			alive: false
		});
	}
	const hazards = [];
	const wreckColors = [
		6583435,
		8138002,
		3359061,
		5722958
	];
	for (let i = 0; i < tuning.hazardPool; i++) {
		const kind = i % 2 === 0 ? "barrier" : "wreck";
		const mesh = kind === "barrier" ? buildJerseyBarrier(stripeTex) : buildWreck(wreckColors[i % wreckColors.length], i % 2 === 0 ? .48 : -.42, smokeTex);
		mesh.visible = false;
		scene.add(mesh);
		hazards.push({
			mesh,
			s: 0,
			lane: 0,
			alive: false,
			kind
		});
	}
	const remotes = /* @__PURE__ */ new Map();
	const labelCache = /* @__PURE__ */ new Map();
	function makeLabel(text) {
		let tex = labelCache.get(text);
		if (!tex) {
			const c = document.createElement("canvas");
			c.width = 256;
			c.height = 64;
			const ctx = c.getContext("2d");
			ctx.fillStyle = "rgba(9,9,11,0.72)";
			ctx.fillRect(8, 8, 240, 48);
			ctx.fillStyle = "#f4f4f5";
			ctx.font = "600 28px Barlow, sans-serif";
			ctx.textAlign = "center";
			ctx.fillText(text.slice(0, 14), 128, 42);
			tex = new CanvasTexture(c);
			tex.colorSpace = SRGBColorSpace;
			labelCache.set(text, tex);
		}
		const s = new Sprite(new SpriteMaterial({
			map: tex,
			transparent: true,
			depthTest: false
		}));
		s.scale.set(3.2, .8, 1);
		return s;
	}
	const keys = /* @__PURE__ */ new Set();
	let qaKeys = null;
	let qaSteer = null;
	const touch = {
		steer: 0,
		throttle: 0,
		brake: 0,
		boost: 0
	};
	let lastThrottle = false;
	const player = {
		x: 0,
		z: 0,
		yaw: 0,
		speed: 0,
		lat: 0,
		s: 16,
		nitro: 40,
		score: 0,
		crashed: false,
		paused: false,
		playing: false,
		boosting: false,
		doubleNitro: false,
		drifting: false,
		slip: 0,
		name: settings.name,
		color: paint.color
	};
	let best = Math.max(overallBest(), bestFor(settings.mode, settings.speed));
	let isHigh = false;
	let boostHeld = false;
	let boostTapAt = -1;
	let spawnT = 0;
	let padT = 2;
	let barT = 6;
	let hudAcc = 0;
	const camPos = new Vector3(0, 2.2, 8);
	const look = new Vector3();
	function held() {
		if (qaKeys) return new Set(qaKeys);
		return keys;
	}
	function stageOf() {
		return 1 + Math.floor(player.score / 2200);
	}
	function maxSpeed() {
		const boost = player.doubleNitro ? 1.78 : player.boosting ? 1.42 : 1;
		return (32 + stageOf() * 2.2) * speedMul * carSpec.top * boost;
	}
	function place(s, lane) {
		const p = sampleAt(path, s);
		return {
			p,
			x: p.x + p.rx * lane,
			z: p.z + p.rz * lane,
			yaw: Math.atan2(-p.fx, -p.fz)
		};
	}
	function resetRun() {
		const start = sampleAt(path, 18);
		player.x = start.x;
		player.z = start.z;
		player.yaw = Math.atan2(-start.fx, -start.fz);
		player.speed = 8;
		player.lat = 0;
		player.s = 18;
		player.nitro = tuning.startNitro;
		player.score = 0;
		player.crashed = false;
		player.paused = false;
		player.playing = true;
		player.boosting = false;
		player.doubleNitro = false;
		player.drifting = false;
		player.slip = 0;
		isHigh = false;
		markI = 0;
		marks.count = 0;
		lastMarkS = 0;
		marks.instanceMatrix.needsUpdate = true;
		boostHeld = false;
		spawnT = 0;
		padT = 1.2;
		barT = 8;
		for (const t of traffic) {
			t.alive = false;
			t.mesh.visible = false;
		}
		for (const p of pads) {
			p.alive = false;
			p.mesh.visible = false;
		}
		for (const b of hazards) {
			b.alive = false;
			b.mesh.visible = false;
		}
		camPos.set(start.x - start.fx * 5.4, 2.1, start.z - start.fz * 5.4);
		for (let i = 0; i < tuning.startTraffic; i++) spawnTraffic(tuning.spawnAheadMin + i * Math.max(6, tuning.packGap + 1));
		for (let i = 0; i < tuning.startPads; i++) spawnPad(24 + i * 16);
		for (let i = 0; i < tuning.startHazards; i++) spawnBarrier(28 + i * 18);
		audio.unlock();
	}
	function spawnTraffic(ahead) {
		const slot = traffic.find((t) => !t.alive);
		if (!slot) return;
		const s = player.s + (ahead ?? tuning.spawnAheadMin + Math.random() * tuning.spawnAheadSpan);
		const lanes = [
			LANE[0],
			LANE[1],
			LANE[2]
		].sort(() => Math.random() - .5);
		let lane = lanes[0];
		let ok = false;
		for (const cand of lanes) {
			if (traffic.some((tr) => tr.alive && Math.abs(tr.s - s) < tuning.packGap && Math.abs(tr.lane - cand) < 2.8)) continue;
			lane = cand;
			ok = true;
			break;
		}
		if (!ok && settings.mode !== "survival") return;
		slot.lane = lane;
		slot.s = Math.min(10708, s);
		slot.speed = (11 + Math.random() * (8 + stageOf() * 2.4)) * tuning.trafficSpeed;
		slot.alive = true;
		slot.mesh.visible = true;
	}
	function spawnPad(ahead) {
		const slot = pads.find((p) => !p.alive);
		if (!slot) return;
		slot.lane = LANE[Math.floor(Math.random() * LANE.length)];
		slot.s = Math.min(10708, player.s + (ahead ?? 35 + Math.random() * 50));
		slot.alive = true;
		slot.mesh.visible = true;
	}
	function spawnBarrier(ahead) {
		if (ahead == null && stageOf() < tuning.barriersFrom) return;
		const prefer = Math.random() < .45 ? "barrier" : "wreck";
		const slot = hazards.find((b) => !b.alive && b.kind === prefer) || hazards.find((b) => !b.alive);
		if (!slot) return;
		slot.lane = LANE[Math.floor(Math.random() * LANE.length)];
		slot.s = Math.min(10708, player.s + (ahead ?? 110 + Math.random() * 40));
		slot.alive = true;
		slot.mesh.visible = true;
	}
	function hud() {
		return {
			score: Math.floor(player.score),
			best,
			speed: Math.max(0, Math.round(player.speed * 9.2)),
			nitro: Math.round(player.nitro),
			stage: stageOf(),
			crashed: player.crashed,
			paused: player.paused,
			playing: player.playing,
			boosting: player.boosting,
			doubleNitro: player.doubleNitro,
			drifting: player.drifting,
			isHigh,
			mode: settings.mode,
			speedPreset: settings.speed,
			carName: carSpec.name
		};
	}
	function emitHud() {
		onHud(hud());
	}
	function crash() {
		if (player.crashed) return;
		player.crashed = true;
		player.boosting = false;
		player.doubleNitro = false;
		audio.stop();
		const submitted = submitScore({
			name: player.name,
			score: Math.floor(player.score),
			mode: settings.mode,
			speed: settings.speed
		});
		best = submitted.best;
		isHigh = submitted.isHigh;
		emitHud();
	}
	function step(dt) {
		if (!player.playing || player.paused || player.crashed) {
			audio.update(0, false, false, false);
			const flames = playerMesh.userData.flames;
			if (flames) {
				flames.red.uniforms.uOn.value = 0;
				flames.blue.uniforms.uOn.value = 0;
				flames.redL.visible = flames.redR.visible = false;
				flames.blueL.visible = flames.blueR.visible = false;
				flames.glow.intensity = 0;
			}
			return;
		}
		const k = held();
		let steer = touch.steer;
		if (qaSteer != null) steer = qaSteer;
		else {
			if (k.has("KeyA") || k.has("ArrowLeft")) steer += 1;
			if (k.has("KeyD") || k.has("ArrowRight")) steer -= 1;
		}
		steer = Math.max(-1, Math.min(1, steer));
		let throttle = touch.throttle;
		if (k.has("KeyW") || k.has("ArrowUp")) throttle = 1;
		let brake = touch.brake;
		if (k.has("KeyS") || k.has("ArrowDown")) brake = 1;
		const wantBoost = touch.boost > 0 || k.has("ShiftLeft") || k.has("ShiftRight") || k.has("KeyE");
		lastThrottle = throttle > 0;
		const nowBoost = wantBoost && player.nitro > 1 && player.speed > 4;
		if (nowBoost && !boostHeld) {
			const tnow = performance.now() / 1e3;
			if (tnow - boostTapAt < .5) player.doubleNitro = true;
			boostTapAt = tnow;
		}
		if (!wantBoost) player.doubleNitro = false;
		boostHeld = nowBoost;
		player.boosting = nowBoost;
		const drain = (player.doubleNitro ? 42 : 26) * tuning.drain / carSpec.nitro;
		if (player.boosting) player.nitro = Math.max(0, player.nitro - drain * dt);
		else player.nitro = Math.min(100, player.nitro + tuning.nitroRegen * dt);
		const road = nearestOnPath(path, player.x, player.z, player.s);
		player.s = road.s;
		player.lat = (player.x - road.x) * road.rx + (player.z - road.z) * road.rz;
		const off = Math.abs(player.lat) > ROAD_HALF;
		const cap = maxSpeed();
		if (throttle > 0) player.speed += 18 * speedMul * carSpec.accel * throttle * dt;
		if (brake > 0) player.speed -= 28 * brake * dt;
		player.speed -= 3.2 * dt;
		if (off) player.speed -= 12 * dt;
		player.speed = Math.max(0, Math.min(cap, player.speed));
		const speedFactor = Math.min(1, player.speed / 10);
		const high = player.speed / Math.max(1, cap);
		const turnRate = 2.15 * carSpec.grip * (1 - .32 * high);
		const driftHold = (k.has("Space") || k.has("KeyQ") || touch.brake > .55) && player.speed > 11;
		if ((Math.abs(steer) > .42 && player.speed > 14 || driftHold) && Math.abs(steer) > .12) {
			player.slip += steer * player.speed * 2.15 * dt;
			player.yaw += steer * turnRate * 1.35 * speedFactor * dt;
		} else {
			player.slip *= Math.exp(-5.2 * dt);
			player.yaw += steer * turnRate * speedFactor * dt;
		}
		player.slip = Math.max(-16, Math.min(16, player.slip));
		player.drifting = Math.abs(player.slip) > 2.1 && player.speed > 8 && !off;
		const fx = -Math.sin(player.yaw);
		const fz = -Math.cos(player.yaw);
		const rxv = Math.cos(player.yaw);
		const rzv = -Math.sin(player.yaw);
		player.x += fx * player.speed * dt + rxv * player.slip * dt;
		player.z += fz * player.speed * dt + rzv * player.slip * dt;
		if (player.drifting) {
			player.score += 26 * dt;
			if (player.s - lastMarkS > .2) {
				lastMarkS = player.s;
				dropMarks(player.x - fx * 1.4, player.z - fz * 1.4, player.yaw, rxv, rzv);
			}
		}
		const after = nearestOnPath(path, player.x, player.z, player.s);
		player.s = Math.max(0, Math.min(maxS, after.s));
		player.lat = (player.x - after.x) * after.rx + (player.z - after.z) * after.rz;
		if (Math.abs(player.lat) > 8.45) {
			const sign = Math.sign(player.lat);
			const push = player.lat - sign * 8.2;
			player.x -= after.rx * push;
			player.z -= after.rz * push;
			player.lat = sign * 8.2;
			player.slip *= -.35;
			if (player.speed > 24) crash();
			else player.speed *= .82;
		}
		if (Math.abs(player.lat) > 12.5) {
			const pull = player.lat - Math.sign(player.lat) * 12.5;
			player.x -= after.rx * pull;
			player.z -= after.rz * pull;
			player.lat = Math.sign(player.lat) * 12.5;
		}
		player.score += player.speed * dt * (4.8 + stageOf() * .6) * tuning.score;
		if (player.boosting) player.score += (player.doubleNitro ? 32 : 18) * dt;
		const st = stageOf();
		spawnT += dt;
		if (spawnT >= Math.max(.16, (1.5 - st * .12) * tuning.spawn)) {
			spawnT = 0;
			spawnTraffic();
			if (Math.random() < tuning.extraTraffic) spawnTraffic();
			if (settings.mode === "survival") spawnTraffic();
		}
		padT += dt;
		if (padT >= Math.max(.45, (6.2 - st * .2) * tuning.pads)) {
			padT = 0;
			spawnPad();
			if (settings.mode === "rush") spawnPad();
		}
		barT += dt;
		if (st >= tuning.barriersFrom && barT >= Math.max(1.05, 6.2 - st * .45)) {
			barT = 0;
			spawnBarrier();
		}
		for (const t of traffic) {
			if (!t.alive) continue;
			t.s += t.speed * dt;
			const placed = place(t.s, t.lane);
			t.mesh.position.set(placed.x, 0, placed.z);
			t.mesh.rotation.y = placed.yaw;
			if (t.s < player.s - 24 || t.s > player.s + 240) {
				t.alive = false;
				t.mesh.visible = false;
				continue;
			}
			if (hitS(player.s, player.lat, 3.6, 1.55, t.s, t.lane, 4, 1.6)) crash();
		}
		for (const p of pads) {
			if (!p.alive) continue;
			const placed = place(p.s, p.lane);
			p.mesh.position.set(placed.x, .1 + Math.sin(performance.now() / 260) * .03, placed.z);
			p.mesh.rotation.y = placed.yaw;
			if (p.s < player.s - 10 || p.s > player.s + 240) {
				p.alive = false;
				p.mesh.visible = false;
				continue;
			}
			if (hitS(player.s, player.lat, 3.6, 1.55, p.s, p.lane, 2, 1.5)) {
				p.alive = false;
				p.mesh.visible = false;
				player.nitro = Math.min(100, player.nitro + tuning.padNitro);
				player.score += 180;
			}
		}
		for (const b of hazards) {
			if (!b.alive) continue;
			const placed = place(b.s, b.lane);
			b.mesh.position.set(placed.x, 0, placed.z);
			b.mesh.rotation.y = placed.yaw;
			const smoke = b.mesh.userData.smoke;
			if (smoke) {
				const pulse = 1.6 + Math.sin(performance.now() / 320 + b.s) * .25;
				smoke.scale.set(pulse, pulse * 1.15, 1);
			}
			if (b.s < player.s - 10 || b.s > player.s + 240) {
				b.alive = false;
				b.mesh.visible = false;
				continue;
			}
			const hitL = b.kind === "wreck" ? 3.8 : 1.35;
			const hitW = b.kind === "wreck" ? 1.7 : 2.05;
			if (hitS(player.s, player.lat, 3.6, 1.55, b.s, b.lane, hitL, hitW)) crash();
		}
		for (const r of remotes.values()) {
			const kPos = Math.min(1, 12 * dt);
			r.x += (r.tx - r.x) * kPos;
			r.z += (r.tz - r.z) * kPos;
			r.yaw = lerpAngle(r.yaw, r.tyaw, Math.min(1, 10 * dt));
			r.mesh.position.set(r.x, 0, r.z);
			r.mesh.rotation.y = r.yaw;
			r.label.position.set(r.x, 2.2, r.z);
			const rp = nearestOnPath(path, r.x, r.z, player.s);
			const rlat = (r.x - rp.x) * rp.rx + (r.z - rp.z) * rp.rz;
			if (hitS(player.s, player.lat, 3.6, 1.55, rp.s, rlat, 3.6, 1.55)) crash();
		}
		sun.target.position.set(player.x, 0, player.z);
		sun.position.set(player.x + 78, 24, player.z + 42);
		sun.target.updateMatrixWorld();
		sunOrb.position.set(player.x + 220, 46, player.z + 130);
		sunHalo.position.copy(sunOrb.position);
		for (let i = 0; i < cloudLayer.length; i++) {
			const cl = cloudLayer[i];
			cl.position.x = player.x + (i % 4 * 110 - 160) + Math.sin(shaderTime.value * .04 + i) * 12;
			cl.position.y = 70 + i % 3 * 12;
			cl.position.z = player.z - 120 - i * 34;
			cl.lookAt(camera.position);
		}
		const lampBase = Math.max(0, Math.min(lampSpot.length - 6, Math.floor(player.s / PATH_DS / 5) * 2));
		for (let i = 0; i < lampLights.length; i++) {
			const sp = lampSpot[lampBase + i];
			if (sp) lampLights[i].position.set(sp.x, sp.y, sp.z);
		}
		const followDist = 5.4;
		const desiredX = player.x - fx * followDist;
		const desiredY = 1.78 + player.speed * .012;
		const desiredZ = player.z - fz * followDist;
		const kCam = 1 - Math.exp(-7.2 * dt);
		camPos.x += (desiredX - camPos.x) * kCam;
		camPos.y += (desiredY - camPos.y) * kCam;
		camPos.z += (desiredZ - camPos.z) * kCam;
		camera.position.copy(camPos);
		look.set(player.x + fx * 6.5, .9, player.z + fz * 6.5);
		camera.lookAt(look);
		camera.fov = 58 + Math.min(12, player.speed * .22) + (player.doubleNitro ? 10 : player.boosting ? 6 : 0) + (player.drifting ? 4 : 0);
		camera.updateProjectionMatrix();
		playerMesh.position.set(player.x, 0, player.z);
		playerMesh.rotation.y = player.yaw;
		playerMesh.rotation.z = steer * -.1 + player.slip * -.018;
		const sm = player.drifting ? .7 : 0;
		driftSmokeL.material.opacity = sm;
		driftSmokeR.material.opacity = sm;
		if (player.drifting) {
			const pulse = 1.05 + Math.sin(performance.now() / 80) * .2;
			driftSmokeL.scale.set(pulse, pulse, 1);
			driftSmokeR.scale.set(pulse, pulse, 1);
		}
		const flames = playerMesh.userData.flames;
		const tnow = performance.now() / 1e3;
		flames.red.uniforms.uTime.value = tnow;
		flames.blue.uniforms.uTime.value = tnow;
		const redOn = player.boosting && !player.doubleNitro ? 1 : 0;
		const blueOn = player.doubleNitro ? 1 : 0;
		flames.red.uniforms.uOn.value = redOn;
		flames.blue.uniforms.uOn.value = blueOn;
		flames.redL.visible = flames.redR.visible = redOn > 0;
		flames.blueL.visible = flames.blueR.visible = blueOn > 0;
		flames.glow.color.set(blueOn ? 3900150 : 16731450);
		flames.glow.intensity = (redOn || blueOn) * (blueOn ? 4.2 : 2.6);
		audio.update(player.speed, player.boosting || player.doubleNitro, true, lastThrottle);
	}
	let acc = 0;
	let last = performance.now();
	let running = true;
	const onKeyDown = (e) => {
		keys.add(e.code);
		audio.unlock();
		if ([
			"Space",
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight"
		].includes(e.code)) e.preventDefault();
		if (e.code === "KeyP" || e.code === "Escape") {
			if (player.playing && !player.crashed) {
				player.paused = !player.paused;
				emitHud();
			}
		}
	};
	const onKeyUp = (e) => keys.delete(e.code);
	const clearKeys = () => keys.clear();
	const onPointer = () => audio.unlock();
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("blur", clearKeys);
	window.addEventListener("pointerdown", onPointer);
	document.addEventListener("visibilitychange", () => {
		if (document.hidden) {
			clearKeys();
			audio.stop();
		} else audio.unlock();
	});
	const onResize = () => {
		const parent = canvas.parentElement;
		const w = Math.max(1, canvas.clientWidth || parent?.clientWidth || window.innerWidth);
		const h = Math.max(1, canvas.clientHeight || parent?.clientHeight || window.innerHeight);
		renderer.setSize(w, h, false);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
	};
	onResize();
	window.addEventListener("resize", onResize);
	const ro = new ResizeObserver(onResize);
	ro.observe(canvas.parentElement || canvas);
	const loop = (now) => {
		if (!running) return;
		let dt = (now - last) / 1e3;
		last = now;
		dt = Math.min(dt, .1);
		acc += dt;
		let steps = 0;
		while (acc >= FIXED_DT && steps < 8) {
			step(FIXED_DT);
			acc -= FIXED_DT;
			steps += 1;
		}
		if (acc >= FIXED_DT) acc = 0;
		hudAcc += dt;
		if (hudAcc > .08) {
			hudAcc = 0;
			emitHud();
		}
		shaderTime.value = now / 1e3;
		skyMat.uniforms.uTime.value = shaderTime.value;
		sky.position.copy(camera.position);
		renderer.render(scene, camera);
	};
	renderer.setAnimationLoop(loop);
	window.__controlsTest = {
		getYaw: () => player.yaw,
		getSpeed: () => player.speed,
		setSteer: (v) => {
			qaSteer = v;
		},
		setKeys: (codes) => {
			qaKeys = codes;
			qaSteer = null;
		}
	};
	return {
		destroy() {
			running = false;
			renderer.setAnimationLoop(null);
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("keyup", onKeyUp);
			window.removeEventListener("blur", clearKeys);
			window.removeEventListener("pointerdown", onPointer);
			window.removeEventListener("resize", onResize);
			ro.disconnect();
			audio.dispose();
			cloudTex.dispose();
			asphalt.dispose();
			grassTex.dispose();
			glassTex.dispose();
			brickTex.dispose();
			shopTex.dispose();
			officeTex.dispose();
			renderer.dispose();
			if (window.__controlsTest) delete window.__controlsTest;
		},
		start() {
			audio.unlock();
			resetRun();
			onResize();
			emitHud();
		},
		pause() {
			player.paused = true;
			emitHud();
		},
		resume() {
			player.paused = false;
			emitHud();
		},
		retry() {
			resetRun();
			emitHud();
		},
		setName(n) {
			player.name = n;
		},
		setTouch(a) {
			if (a.steer != null) touch.steer = a.steer;
			if (a.throttle != null) touch.throttle = a.throttle;
			if (a.brake != null) touch.brake = a.brake;
			if (a.boost != null) touch.boost = a.boost;
		},
		setRemotes(list) {
			const seen = /* @__PURE__ */ new Set();
			for (const s of list) {
				seen.add(s.id);
				let r = remotes.get(s.id);
				if (!r) {
					const mesh = buildCar(s.color || TRAFFIC_COLORS[0], false, "apex");
					const label = makeLabel(s.name || "Racer");
					scene.add(mesh, label);
					r = {
						mesh,
						label,
						x: s.x,
						z: s.z,
						yaw: s.yaw,
						tx: s.x,
						tz: s.z,
						tyaw: s.yaw
					};
					remotes.set(s.id, r);
				}
				r.tx = s.x;
				r.tz = s.z;
				r.tyaw = s.yaw;
				r.mesh.visible = !s.crashed;
			}
			for (const [id, r] of remotes) {
				if (seen.has(id)) continue;
				scene.remove(r.mesh, r.label);
				remotes.delete(id);
			}
		},
		getLocal() {
			return {
				x: player.x,
				z: player.z,
				yaw: player.yaw,
				speed: player.speed,
				nitro: player.nitro,
				crashed: player.crashed,
				score: player.score,
				color: player.color,
				name: player.name
			};
		},
		getHud: hud
	};
}
var emptyHud = {
	score: 0,
	best: 0,
	speed: 0,
	nitro: 0,
	stage: 1,
	crashed: false,
	paused: false,
	playing: false,
	boosting: false,
	doubleNitro: false,
	drifting: false,
	isHigh: false,
	mode: "circuit",
	speedPreset: "sport",
	carName: "Apex Twin"
};
function GameShell({ name, room, joinLabel, online, mode, speed, car, paint, p2p, onExit }) {
	const canvasRef = (0, import_react.useRef)(null);
	const apiRef = (0, import_react.useRef)(null);
	const [hud, setHud] = (0, import_react.useState)(emptyHud);
	const remotesRef = (0, import_react.useRef)({});
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const api = createGame(canvas, setHud, {
			name,
			mode,
			speed,
			car,
			paint
		});
		api.setName(name);
		apiRef.current = api;
		api.start();
		return () => {
			api.destroy();
			apiRef.current = null;
		};
	}, [
		name,
		mode,
		speed,
		car,
		paint
	]);
	(0, import_react.useEffect)(() => {
		if (!p2p) return;
		return p2p.onMessage((from, data) => {
			const d = data;
			if (!d || typeof d.x !== "number") return;
			remotesRef.current[from] = {
				...d,
				id: from
			};
			apiRef.current?.setRemotes(Object.values(remotesRef.current));
		});
	}, [p2p]);
	(0, import_react.useEffect)(() => {
		if (!p2p) return;
		const alive = new Set(p2p.peers.map((p) => p.id));
		for (const id of Object.keys(remotesRef.current)) if (!alive.has(id)) delete remotesRef.current[id];
		apiRef.current?.setRemotes(Object.values(remotesRef.current));
	}, [p2p, p2p?.peers]);
	(0, import_react.useEffect)(() => {
		if (!p2p) return;
		let raf = 0;
		let last = 0;
		const tick = (now) => {
			if (now - last >= 50) {
				last = now;
				const local = apiRef.current?.getLocal();
				if (local) p2p.broadcast(local);
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [p2p]);
	const press = (partial, down) => {
		const next = { ...partial };
		if (!down) for (const k of Object.keys(next)) next[k] = 0;
		apiRef.current?.setTouch(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute inset-0 block h-full w-full touch-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4 pt-[max(1rem,env(safe-area-inset-top))]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface/80 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-muted",
							children: "V3 SCORE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl tabular-nums leading-none",
							children: hud.score
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-subtle",
							children: ["Best ", hud.best]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-xl bg-surface/80 px-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-4 text-muted" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-lg tabular-nums",
								children: hud.speed
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: "km/h"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-surface/80 px-3 py-2 text-right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium text-fg",
								children: [
									MODE_INFO[hud.mode].label,
									" · ",
									SPEED_INFO[hud.speedPreset].label
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-44 text-xs text-subtle",
								children: MODE_INFO[hud.mode].blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-subtle",
								children: [
									hud.carName,
									" · Stage ",
									hud.stage
								]
							}),
							online && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex items-center justify-end gap-1 text-xs text-subtle",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3" }),
									1 + (p2p?.peers.length ?? 0),
									" · ",
									joinLabel || room
								]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 top-28 z-10 flex justify-center px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center justify-between text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3" }), " Nitro"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono tabular-nums",
							children: [hud.drifting ? "DRIFT " : hud.doubleNitro ? "DOUBLE " : hud.boosting ? "NOS " : "", hud.nitro]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 overflow-hidden rounded-full bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-full ${hud.drifting ? "bg-ok" : hud.doubleNitro ? "bg-ice" : hud.boosting ? "bg-flame" : "bg-accent"}`,
							style: { width: `${hud.nitro}%` }
						})
					})]
				})
			}),
			hud.paused && !hud.crashed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				title: "Paused",
				body: "W gas · A/D steer hard at speed to drift. Space holds a slide. Shift/E nitro.",
				actions: [{
					label: "Resume",
					onClick: () => apiRef.current?.resume()
				}, {
					label: "Leave",
					onClick: onExit,
					ghost: true
				}]
			}),
			hud.crashed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				title: "Crashed",
				body: `${hud.isHigh ? "NEW HIGH SCORE · " : ""}Score ${hud.score} · Best ${hud.best} · ${MODE_INFO[hud.mode].label} ${SPEED_INFO[hud.speedPreset].label}`,
				actions: [{
					label: "Retry",
					onClick: () => apiRef.current?.retry(),
					icon: true
				}, {
					label: "Menu",
					onClick: onExit,
					ghost: true
				}]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute top-[max(1rem,env(safe-area-inset-top))] left-1/2 z-10 flex -translate-x-1/2 rounded-full bg-surface/80 p-3 text-fg",
				onClick: () => hud.paused ? apiRef.current?.resume() : apiRef.current?.pause(),
				"aria-label": "Pause",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchBtn, {
						label: "Left",
						onDown: () => press({ steer: 1 }, true),
						onUp: () => press({ steer: 1 }, false)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchBtn, {
						label: "Right",
						onDown: () => press({ steer: -1 }, true),
						onUp: () => press({ steer: -1 }, false)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchBtn, {
							label: "Brake",
							onDown: () => press({ brake: 1 }, true),
							onUp: () => press({ brake: 1 }, false)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchBtn, {
							label: "Nitro",
							accent: true,
							onDown: () => press({ boost: 1 }, true),
							onUp: () => press({ boost: 1 }, false)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchBtn, {
							label: "Gas",
							primary: true,
							onDown: () => press({ throttle: 1 }, true),
							onUp: () => press({ throttle: 1 }, false)
						})
					]
				})]
			})
		]
	});
}
function Overlay({ title, body, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-center justify-center bg-bg/70 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-xl bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-wide",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-col gap-2",
					children: actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: a.onClick,
						className: a.ghost ? "h-11 rounded-md border border-border text-sm font-medium text-fg" : "h-11 rounded-md bg-accent text-sm font-medium text-accent-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [a.icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }) : null, a.label]
						})
					}, a.label))
				})
			]
		})
	});
}
function TouchBtn({ label, onDown, onUp, primary, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "h-14 min-w-16 rounded-lg px-4 text-sm font-medium select-none " + (primary ? "bg-accent text-accent-fg" : accent ? "bg-ok text-accent-fg" : "bg-surface/90 text-fg"),
		onPointerDown: (e) => {
			e.preventDefault();
			e.target.setPointerCapture(e.pointerId);
			onDown();
		},
		onPointerUp: onUp,
		onPointerCancel: onUp,
		children: label
	});
}
var FAST_POLL_MS = 400;
var IDLE_POLL_MS = 2e3;
var PING_INTERVAL_MS = 2e3;
var STALL_MS = 1e4;
var MAX_RECOVERY_ATTEMPTS = 3;
var SIGNAL_RETRY_DELAYS_MS = [250, 750];
function defaultIceServers() {
	return [{ urls: ["stun:stun.l.google.com:19302", "stun:stun.cloudflare.com:3478"] }];
}
var P2PRoom = class {
	opts;
	peers = /* @__PURE__ */ new Map();
	/** Per-remote-peer signal delivery chains (order-preserving). */
	signalQueues = /* @__PURE__ */ new Map();
	cursor = 0;
	pollTimer = null;
	pingTimer = null;
	closed = false;
	everPolled = false;
	lastPeersFingerprint = "";
	constructor(opts) {
		this.opts = opts;
	}
	/**
	* The first poll IS the join: it registers this peer and returns the
	* roster. A failed first poll (cold DB, offline tab) must not strand the
	* room: the loop and timers start regardless and the next poll retries.
	*/
	async join() {
		try {
			await this.pollOnce();
		} catch {}
		if (this.closed) return;
		this.schedulePoll(this.anyPairConnecting() ? FAST_POLL_MS : IDLE_POLL_MS);
		this.pingTimer = setInterval(() => {
			this.pingAll();
			this.watchdog();
		}, PING_INTERVAL_MS);
	}
	close() {
		this.closed = true;
		if (this.pollTimer) clearTimeout(this.pollTimer);
		if (this.pingTimer) clearInterval(this.pingTimer);
		for (const slot of this.peers.values()) slot.pc.close();
		this.peers.clear();
		fetch("/api/rtc", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				op: "leave",
				room: this.opts.room,
				peer: this.opts.selfId
			}),
			keepalive: true
		}).catch(() => {});
	}
	/** Send on the unreliable game-state channel (drops stale packets). */
	broadcast(data) {
		const wire = JSON.stringify({
			t: "d",
			d: data
		});
		for (const slot of this.peers.values()) if (slot.state?.readyState === "open") slot.state.send(wire);
	}
	/** Send reliably (ordered) to one peer, or to all when peerId is omitted. */
	send(data, peerId) {
		const wire = JSON.stringify({
			t: "d",
			d: data
		});
		const targets = peerId ? [this.peers.get(peerId)] : [...this.peers.values()];
		for (const slot of targets) if (slot?.reliable?.readyState === "open") slot.reliable.send(wire);
	}
	peerList() {
		return [...this.peers.values()].map((s) => ({ ...s.info }));
	}
	schedulePoll(delay) {
		if (this.closed) return;
		if (this.pollTimer) clearTimeout(this.pollTimer);
		this.pollTimer = setTimeout(() => void this.poll(), delay);
	}
	anyPairConnecting() {
		for (const s of this.peers.values()) {
			if (s.terminal) continue;
			if (s.info.connectionState !== "connected") return true;
		}
		return false;
	}
	async pollOnce() {
		const params = new URLSearchParams({
			room: this.opts.room,
			peer: this.opts.selfId,
			name: this.opts.name ?? "",
			since: String(this.cursor)
		});
		const res = await fetch(`/api/rtc?${params}`);
		if (this.closed) return;
		if (!res.ok) throw new Error(`signaling poll failed: ${res.status}`);
		const body = await res.json();
		if (this.closed) return;
		if (!this.everPolled) {
			this.everPolled = true;
			this.opts.onConnected?.();
		}
		this.reconcileRoster(body.peers);
		const roster = new Set(body.peers.map((p) => p.id));
		for (const sig of body.signals) {
			this.cursor = Math.max(this.cursor, sig.id);
			await this.onSignal(sig.from, sig.kind, sig.payload, roster);
			if (this.closed) return;
		}
	}
	async poll() {
		if (this.closed) return;
		try {
			await this.pollOnce();
		} catch {}
		this.schedulePoll(this.anyPairConnecting() ? FAST_POLL_MS : IDLE_POLL_MS);
	}
	reconcileRoster(peers) {
		const alive = new Set(peers.map((p) => p.id));
		for (const p of peers) {
			if (p.id === this.opts.selfId) continue;
			const existing = this.peers.get(p.id);
			if (existing) existing.info.name = p.name;
			else this.connectTo(p.id, p.name, this.opts.selfId > p.id);
		}
		for (const [id, slot] of this.peers) if (!alive.has(id)) {
			slot.pc.close();
			this.peers.delete(id);
		}
		this.emitPeers();
	}
	connectTo(peerId, name, initiator) {
		if (this.closed) return null;
		const pc = new RTCPeerConnection({ iceServers: this.opts.iceServers ?? defaultIceServers() });
		const slot = {
			pc,
			makingOffer: false,
			ignoreOffer: false,
			pendingCandidates: [],
			lastProgressAt: Date.now(),
			recoveryAttempts: 0,
			info: {
				id: peerId,
				name,
				connectionState: pc.connectionState,
				candidateType: null,
				rttMs: null
			}
		};
		this.peers.set(peerId, slot);
		pc.onicecandidate = (e) => {
			if (e.candidate) this.sendSignal(peerId, "ice", e.candidate.toJSON());
		};
		pc.onconnectionstatechange = () => {
			slot.info.connectionState = pc.connectionState;
			if (pc.connectionState === "connecting" || pc.connectionState === "connected") slot.lastProgressAt = Date.now();
			if (pc.connectionState === "connected") {
				slot.recoveryAttempts = 0;
				slot.terminal = false;
				this.readCandidateType(slot);
			}
			this.emitPeers();
			if (pc.connectionState === "failed") pc.restartIce();
			if (pc.connectionState === "failed" || pc.connectionState === "disconnected") this.schedulePoll(FAST_POLL_MS);
		};
		pc.onnegotiationneeded = async () => {
			try {
				slot.makingOffer = true;
				await pc.setLocalDescription();
				await this.sendSignal(peerId, "offer", pc.localDescription.toJSON());
			} catch {} finally {
				slot.makingOffer = false;
			}
		};
		pc.ondatachannel = (e) => this.attachChannel(slot, e.channel);
		if (initiator) {
			this.attachChannel(slot, pc.createDataChannel("state", {
				ordered: false,
				maxRetransmits: 0
			}));
			this.attachChannel(slot, pc.createDataChannel("reliable", { ordered: true }));
		}
		return slot;
	}
	attachChannel(slot, channel) {
		if (channel.label === "state") slot.state = channel;
		else slot.reliable = channel;
		channel.onopen = () => {
			slot.lastProgressAt = Date.now();
		};
		channel.onmessage = (e) => {
			let msg;
			try {
				msg = JSON.parse(e.data);
			} catch {
				return;
			}
			if (msg.t === "ping") {
				if (slot.state?.readyState === "open") slot.state.send(JSON.stringify({ t: "pong" }));
			} else if (msg.t === "pong") {
				if (slot.pingSentAt) {
					slot.info.rttMs = Math.round(performance.now() - slot.pingSentAt);
					slot.pingSentAt = void 0;
					this.emitPeers();
				}
			} else this.opts.onMessage?.(slot.info.id, msg.d, channel.label === "state" ? "state" : "reliable");
		};
	}
	/** Apply buffered ICE candidates once a remote description is in place. */
	async flushPendingCandidates(slot) {
		while (slot.pendingCandidates.length > 0) {
			const candidate = slot.pendingCandidates.shift();
			try {
				await slot.pc.addIceCandidate(candidate);
			} catch (err) {
				if (!slot.ignoreOffer) console.warn("[p2p] addIceCandidate failed:", err);
			}
			if (this.closed) return;
		}
	}
	async onSignal(from, kind, payload, roster) {
		if (this.closed) return;
		let slot = this.peers.get(from);
		if (!slot) {
			if (!roster.has(from)) return;
			const created = this.connectTo(from, "", false);
			if (!created) return;
			slot = created;
		}
		const polite = this.opts.selfId < from;
		try {
			if (kind === "offer" || kind === "answer") {
				const description = payload;
				const collision = kind === "offer" && (slot.makingOffer || slot.pc.signalingState !== "stable");
				slot.ignoreOffer = !polite && collision;
				if (slot.ignoreOffer) return;
				try {
					await slot.pc.setRemoteDescription(description);
				} catch (err) {
					if (kind !== "offer" || slot.recreatedForOffer) throw err;
					const attempts = slot.recoveryAttempts;
					const name = slot.info.name;
					slot.pc.close();
					this.peers.delete(from);
					const fresh = this.connectTo(from, name, false);
					if (!fresh) return;
					fresh.recoveryAttempts = attempts;
					fresh.recreatedForOffer = true;
					slot = fresh;
					await slot.pc.setRemoteDescription(description);
				}
				if (this.closed) return;
				await this.flushPendingCandidates(slot);
				if (this.closed) return;
				if (kind === "offer") {
					await slot.pc.setLocalDescription();
					if (this.closed) return;
					await this.sendSignal(from, "answer", slot.pc.localDescription.toJSON());
				}
			} else if (kind === "ice") {
				const candidate = payload;
				if (!slot.pc.remoteDescription) {
					slot.pendingCandidates.push(candidate);
					return;
				}
				try {
					await slot.pc.addIceCandidate(candidate);
				} catch (err) {
					if (!slot.ignoreOffer) console.warn("[p2p] addIceCandidate failed:", err);
				}
			}
		} catch {}
	}
	/**
	* Signals are serialized per remote peer (a candidate must never overtake
	* its SDP into the DB) and retried on failure with short backoff.
	*/
	sendSignal(to, kind, payload) {
		const next = (this.signalQueues.get(to) ?? Promise.resolve()).then(() => this.postSignal(to, kind, payload));
		this.signalQueues.set(to, next.catch(() => {}));
		return next;
	}
	async postSignal(to, kind, payload) {
		for (let attempt = 0;; attempt++) {
			if (this.closed) return;
			try {
				const res = await fetch("/api/rtc", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						op: "signal",
						room: this.opts.room,
						from: this.opts.selfId,
						to,
						kind,
						payload
					})
				});
				if (res.ok) return;
				throw new Error(`signal POST failed: ${res.status}`);
			} catch (err) {
				if (attempt >= SIGNAL_RETRY_DELAYS_MS.length) {
					console.warn(`[p2p] signal ${kind} to ${to} failed after retries`, err);
					return;
				}
				await new Promise((r) => setTimeout(r, SIGNAL_RETRY_DELAYS_MS[attempt]));
			}
		}
	}
	pingAll() {
		const wire = JSON.stringify({ t: "ping" });
		for (const slot of this.peers.values()) {
			if (slot.state?.readyState !== "open") continue;
			const stale = slot.pingSentAt !== void 0 && performance.now() - slot.pingSentAt > 2 * PING_INTERVAL_MS;
			if (slot.pingSentAt === void 0 || stale) {
				slot.pingSentAt = performance.now();
				slot.state.send(wire);
			}
		}
	}
	/**
	* Stuck-pair recovery, piggybacked on the ping interval. A pair that has
	* made no progress for STALL_MS gets rebuilt by the dialer with a FRESH
	* RTCPeerConnection (new DTLS identity — fixes the suspend/resume
	* fingerprint wedge). After MAX_RECOVERY_ATTEMPTS the pair is terminal:
	* visible to the app as its last connectionState, ignored by fast-poll.
	*/
	watchdog() {
		if (this.closed) return;
		const now = Date.now();
		for (const [peerId, slot] of this.peers) {
			const live = slot.pc.connectionState;
			if (live !== slot.info.connectionState) {
				slot.info.connectionState = live;
				if (live === "connecting" || live === "connected") slot.lastProgressAt = now;
				this.emitPeers();
			}
			if (slot.terminal || live === "connected") continue;
			if (now - slot.lastProgressAt <= STALL_MS) continue;
			if (slot.recoveryAttempts >= MAX_RECOVERY_ATTEMPTS) {
				slot.terminal = true;
				this.emitPeers();
				continue;
			}
			slot.recoveryAttempts += 1;
			slot.lastProgressAt = now;
			if (this.opts.selfId > peerId) {
				const { name } = slot.info;
				const attempts = slot.recoveryAttempts;
				slot.pc.close();
				this.peers.delete(peerId);
				const fresh = this.connectTo(peerId, name, true);
				if (fresh) fresh.recoveryAttempts = attempts;
				this.schedulePoll(FAST_POLL_MS);
			}
		}
	}
	async readCandidateType(slot) {
		try {
			const stats = await slot.pc.getStats();
			let selected;
			stats.forEach((s) => {
				if (s.type === "candidate-pair" && s.nominated) selected = s;
			});
			const localId = selected?.localCandidateId;
			if (localId) {
				const local = stats.get(localId);
				slot.info.candidateType = local?.candidateType ?? null;
				this.emitPeers();
			}
		} catch {}
	}
	emitPeers() {
		const list = this.peerList();
		const fingerprint = JSON.stringify(list.map((p) => [
			p.id,
			p.name,
			p.connectionState,
			p.candidateType,
			p.rttMs
		]));
		if (fingerprint === this.lastPeersFingerprint) return;
		this.lastPeersFingerprint = fingerprint;
		this.opts.onPeersChanged?.(list);
	}
};
function defaultRoom() {
	if (typeof window === "undefined") return "FASTND";
	return `FASTND`;
}
function useP2PRoom(options = {}) {
	const [selfId] = (0, import_react.useState)(() => `p-${Math.random().toString(36).slice(2, 10)}`);
	const [room] = (0, import_react.useState)(() => options.room ?? defaultRoom());
	const [name] = (0, import_react.useState)(() => options.name ?? selfId);
	const [peers, setPeers] = (0, import_react.useState)([]);
	const [joined, setJoined] = (0, import_react.useState)(false);
	const roomRef = (0, import_react.useRef)(null);
	const listeners = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		const p2p = new P2PRoom({
			room,
			selfId,
			name,
			onPeersChanged: setPeers,
			onMessage: (from, data, channel) => {
				for (const fn of listeners.current) fn(from, data, channel);
			},
			onConnected: () => setJoined(true)
		});
		roomRef.current = p2p;
		p2p.join();
		return () => {
			roomRef.current = null;
			p2p.close();
		};
	}, [
		room,
		selfId,
		name
	]);
	return {
		selfId,
		room,
		peers,
		joined,
		broadcast: (0, import_react.useCallback)((data) => roomRef.current?.broadcast(data), []),
		send: (0, import_react.useCallback)((data, peerId) => roomRef.current?.send(data, peerId), []),
		onMessage: (0, import_react.useCallback)((fn) => {
			listeners.current.add(fn);
			return () => {
				listeners.current.delete(fn);
			};
		}, [])
	};
}
var MODES = [
	"cruise",
	"circuit",
	"rush",
	"survival"
];
var SPEEDS = [
	"touring",
	"sport",
	"super",
	"insane"
];
function lobbyFromIpPort(ip, port) {
	const host = ip.trim() || "127.0.0.1";
	const p = port.replace(/[^0-9]/g, "").slice(0, 5) || "5555";
	return {
		room: `${host.replace(/[^a-zA-Z0-9]/g, "-")}-${p}`.replace(/-+/g, "-").slice(0, 64) || "FASTND",
		label: `${host}:${p}`
	};
}
function Home() {
	const [session, setSession] = (0, import_react.useState)(null);
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { onPlay: setSession });
	const shellKey = `${session.mode}-${session.speed}-${session.car}-${session.paint}-${session.name}`;
	if (session.online) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnlineRace, {
		session,
		onExit: () => setSession(null)
	}, shellKey);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameShell, {
		...session,
		p2p: null,
		onExit: () => setSession(null)
	}, shellKey);
}
function OnlineRace({ session, onExit }) {
	const p2p = useP2PRoom({
		room: session.room,
		name: session.name
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameShell, {
		...session,
		p2p,
		onExit
	});
}
function readSaved(key, allowed, fallback) {
	try {
		const v = localStorage.getItem(key);
		if (v && allowed.includes(v)) return v;
	} catch {}
	return fallback;
}
function Menu({ onPlay }) {
	const [name, setName] = (0, import_react.useState)("Racer");
	const [host, setHost] = (0, import_react.useState)("127.0.0.1");
	const [port, setPort] = (0, import_react.useState)("5555");
	const [online, setOnline] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("circuit");
	const [speed, setSpeed] = (0, import_react.useState)("sport");
	const [car, setCar] = (0, import_react.useState)("apex");
	const [paint, setPaint] = (0, import_react.useState)("midnight");
	const [scores, setScores] = (0, import_react.useState)([]);
	const [best, setBest] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		try {
			const saved = localStorage.getItem("fnp-name");
			if (saved) setName(saved);
		} catch {}
		setMode(readSaved("fnp-mode", MODES, "circuit"));
		setSpeed(readSaved("fnp-speed", SPEEDS, "sport"));
		setCar(readSaved("fnp-car", CARS.map((c) => c.id), "apex"));
		setPaint(readSaved("fnp-paint", PAINTS.map((p) => p.id), "midnight"));
		setScores(loadScores());
		setBest(overallBest());
	}, []);
	const hint = (0, import_react.useMemo)(() => MODE_INFO[mode].blurb, [mode]);
	const carInfo = CARS.find((c) => c.id === car) ?? CARS[0];
	const go = () => {
		const n = name.trim().slice(0, 16) || "Racer";
		const { room, label } = lobbyFromIpPort(host, port);
		try {
			localStorage.setItem("fnp-name", n);
			localStorage.setItem("fnp-mode", mode);
			localStorage.setItem("fnp-speed", speed);
			localStorage.setItem("fnp-car", car);
			localStorage.setItem("fnp-paint", paint);
		} catch {}
		onPlay({
			name: n,
			room,
			online,
			joinLabel: label,
			mode,
			speed,
			car,
			paint
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh items-start justify-center bg-bg px-4 py-5 text-fg md:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid w-full max-w-5xl gap-6 md:grid-cols-[1.15fr_0.85fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.32em] text-muted",
						children: "VERSION 3 · VIRTUALITY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl tracking-wide md:text-5xl",
						children: "FAST ND PRAISE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Virtual dusk. Hologram rails. Cumulus sky. Same lobby name to race a friend."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-4 block text-xs font-medium tracking-widest text-muted",
						htmlFor: "racer",
						children: "DRIVER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "racer",
						value: name,
						onChange: (e) => setName(e.target.value),
						maxLength: 16,
						placeholder: "Callsign",
						className: "mt-2 h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none ring-accent focus:ring-2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs font-medium tracking-widest text-muted",
						children: "MODE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-2 gap-2",
						children: MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode(m),
							className: "h-12 rounded-md px-3 text-left text-sm font-medium " + (mode === m ? "bg-accent text-accent-fg" : "border border-border bg-elevated text-muted"),
							children: MODE_INFO[m].label
						}, m))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs leading-relaxed text-subtle",
						children: hint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs font-medium tracking-widest text-muted",
						children: "SPEED CLASS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-4 gap-2",
						children: SPEEDS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSpeed(s),
							className: "h-11 rounded-md text-xs font-medium sm:text-sm " + (speed === s ? "bg-accent text-accent-fg" : "border border-border bg-elevated text-muted"),
							children: SPEED_INFO[s].label
						}, s))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs font-medium tracking-widest text-muted",
						children: "PLAY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOnline(false),
							className: "h-11 rounded-md text-sm font-medium " + (!online ? "bg-accent text-accent-fg" : "border border-border bg-elevated text-muted"),
							children: "Solo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOnline(true),
							className: "h-11 rounded-md text-sm font-medium " + (online ? "bg-accent text-accent-fg" : "border border-border bg-elevated text-muted"),
							children: "Online"
						})]
					}),
					online && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-subtle",
						children: "Both drivers type the same lobby and port. There is no dedicated server."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-3 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-medium text-muted",
								htmlFor: "host",
								children: "Lobby name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "host",
								value: host,
								onChange: (e) => setHost(e.target.value),
								maxLength: 40,
								className: "mt-2 h-11 w-full rounded-md border border-border bg-elevated px-3 font-mono text-sm text-fg outline-none ring-accent focus:ring-2"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-medium text-muted",
							htmlFor: "port",
							children: "Port"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "port",
							value: port,
							onChange: (e) => setPort(e.target.value.replace(/[^0-9]/g, "").slice(0, 5)),
							inputMode: "numeric",
							className: "mt-2 h-11 w-full rounded-md border border-border bg-elevated px-3 font-mono text-sm text-fg outline-none ring-accent focus:ring-2"
						})] })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: go,
						className: "mt-6 h-12 w-full rounded-md bg-accent text-sm font-semibold tracking-wide text-accent-fg",
						children: ["Drive ", carInfo.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-subtle",
						children: [
							MODE_INFO[mode].label,
							" · ",
							SPEED_INFO[speed].label,
							" · ",
							carInfo.name
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface p-4 md:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.32em] text-muted",
							children: "GARAGE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl",
							children: carInfo.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: carInfo.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-1 gap-2",
							children: CARS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setCar(c.id),
								className: "min-h-11 rounded-md px-3 py-2 text-left " + (car === c.id ? "bg-accent text-accent-fg" : "border border-border bg-elevated text-muted"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-medium",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs " + (car === c.id ? "text-accent-fg/80" : "text-subtle"),
									children: c.blurb
								})]
							}, c.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs font-medium tracking-widest text-muted",
							children: "PAINT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: PAINTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPaint(p.id),
								"aria-label": p.name,
								className: "size-11 rounded-full border-2 " + p.token + (paint === p.id ? " border-accent" : " border-border")
							}, p.id))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface p-4 md:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.32em] text-muted",
							children: "HIGH SCORES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-4xl tabular-nums",
							children: best || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: "All-time best"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "mt-5 space-y-2",
							children: [scores.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-subtle",
								children: "No records yet. Take a run."
							}), scores.slice(0, 6).map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-baseline justify-between gap-3 border-b border-border pb-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 truncate",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mr-2 font-mono text-xs text-subtle",
										children: String(i + 1).padStart(2, "0")
									}), row.name]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 font-mono tabular-nums text-fg",
									children: row.score
								})]
							}, `${row.at}-${row.name}-${i}`))]
						}),
						scores[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs text-subtle",
							children: [
								"Top run: ",
								MODE_INFO[scores[0].mode].label,
								" · ",
								SPEED_INFO[scores[0].speed].label
							]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { Home as component };
