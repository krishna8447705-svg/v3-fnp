#!/usr/bin/env python3
"""
Fast ND Praise – Car Racing Game (Client)
Single-player or multiplayer.
"""

import pygame
import socket
import threading
import json
import sys
import random
import time

# ---------- Config ----------
WIDTH, HEIGHT = 480, 720
FPS = 60
ROAD_LEFT = 70
ROAD_RIGHT = WIDTH - 70
LANE_COUNT = 3
LANE_W = (ROAD_RIGHT - ROAD_LEFT) / LANE_COUNT

HOST_DEFAULT = "127.0.0.1"
PORT_DEFAULT = 5555

# Colors
BLACK = (10, 10, 18)
ROAD = (26, 26, 34)
GRASS = (12, 28, 14)
LANE_MARK = (255, 204, 0)
WHITE = (240, 240, 255)
CYAN = (0, 245, 255)
YELLOW = (255, 204, 0)
RED = (255, 68, 102)
GRAY = (40, 40, 55)

PLAYER_COLORS = [
    (0, 245, 255),    # cyan
    (255, 68, 102),   # red
    (255, 170, 0),    # orange
    (170, 102, 255),  # purple
    (68, 255, 136),   # green
    (255, 102, 170),  # pink
]

# ---------- Networking ----------
class NetClient:
    def __init__(self):
        self.sock = None
        self.connected = False
        self.my_id = None
        self.my_color_idx = 0
        self.others = {}  # id -> {name, x, y, speed, color_idx}
        self.lock = threading.Lock()
        self.chat_log = []
        self.buffer = ""

    def connect(self, host, port, name):
        try:
            self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.sock.settimeout(5)
            self.sock.connect((host, port))
            self.sock.settimeout(0.05)
            self.send({"type": "login", "name": name})
            self.connected = True
            threading.Thread(target=self._recv_loop, daemon=True).start()
            return True, "Connected!"
        except Exception as e:
            self.connected = False
            return False, str(e)

    def send(self, msg):
        if not self.sock:
            return
        try:
            self.sock.sendall((json.dumps(msg) + "\n").encode("utf-8"))
        except Exception:
            self.connected = False

    def send_state(self, x, y, speed):
        if self.connected:
            self.send({"type": "state", "x": x, "y": y, "speed": speed})

    def _recv_loop(self):
        while self.connected:
            try:
                data = self.sock.recv(4096)
                if not data:
                    self.connected = False
                    break
                self.buffer += data.decode("utf-8", errors="ignore")
                while "\n" in self.buffer:
                    line, self.buffer = self.buffer.split("\n", 1)
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        msg = json.loads(line)
                        self._handle(msg)
                    except json.JSONDecodeError:
                        pass
            except socket.timeout:
                continue
            except Exception:
                self.connected = False
                break

    def _handle(self, msg):
        t = msg.get("type")
        with self.lock:
            if t == "welcome":
                self.my_id = msg.get("id")
                self.my_color_idx = msg.get("color_idx", 0)
            elif t == "players":
                new = {}
                for p in msg.get("list", []):
                    pid = p.get("id")
                    if pid and pid != self.my_id:
                        new[pid] = p
                self.others = new
            elif t == "join":
                pid = msg.get("id")
                if pid and pid != self.my_id:
                    self.others[pid] = {
                        "name": msg.get("name", "?"),
                        "x": 180, "y": 200, "speed": 0,
                        "color_idx": msg.get("color_idx", 0),
                    }
            elif t == "leave":
                pid = msg.get("id")
                if pid in self.others:
                    del self.others[pid]
            elif t == "chat":
                self.chat_log.append(f"{msg.get('name','?')}: {msg.get('text','')}")
                self.chat_log = self.chat_log[-6:]

    def get_others(self):
        with self.lock:
            return dict(self.others)

    def get_chat(self):
        with self.lock:
            return list(self.chat_log)

    def close(self):
        self.connected = False
        if self.sock:
            try:
                self.sock.close()
            except Exception:
                pass


# ---------- Game objects ----------
class Player:
    def __init__(self, x, y, color=(0, 245, 255)):
        self.x = x
        self.y = y
        self.w = 42
        self.h = 72
        self.speed = 0.0
        self.max_speed = 13.0
        self.accel = 0.22
        self.brake = 0.4
        self.friction = 0.045
        self.steer = 5.8
        self.color = color

    def update(self, keys):
        if keys[pygame.K_w] or keys[pygame.K_UP]:
            self.speed = min(self.max_speed, self.speed + self.accel)
        elif keys[pygame.K_s] or keys[pygame.K_DOWN]:
            self.speed = max(0, self.speed - self.brake)
        else:
            self.speed = max(0, self.speed - self.friction)

        factor = 0.55 + 0.45 * (self.speed / self.max_speed)
        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            self.x -= self.steer * factor
        if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            self.x += self.steer * factor

        self.x = max(ROAD_LEFT + 2, min(ROAD_RIGHT - self.w - 2, self.x))

    def rect(self):
        return pygame.Rect(self.x, self.y, self.w, self.h)


class TrafficCar:
    def __init__(self):
        lane = random.randint(0, LANE_COUNT - 1)
        self.x = ROAD_LEFT + lane * LANE_W + (LANE_W - 40) / 2
        self.y = -90
        self.w = 40
        self.h = 70
        self.speed = 2.0 + random.random() * 3.5
        self.color = random.choice(PLAYER_COLORS[1:])

    def update(self, player_speed):
        self.y += player_speed - self.speed

    def rect(self):
        return pygame.Rect(self.x, self.y, self.w, self.h)

    def offscreen(self):
        return self.y > HEIGHT + 60


# ---------- Drawing helpers ----------
def draw_car(surf, x, y, w, h, color, name=None, font=None):
    body = pygame.Rect(x, y + 6, w, h - 12)
    pygame.draw.rect(surf, color, body, border_radius=7)
    # roof
    dark = tuple(max(0, c - 60) for c in color)
    pygame.draw.rect(surf, dark, (x + 6, y + 18, w - 12, h - 42), border_radius=4)
    # windows
    win = (170, 220, 255) if color[2] > 200 else (100, 140, 180)
    pygame.draw.rect(surf, win, (x + 8, y + 22, w - 16, 13))
    pygame.draw.rect(surf, win, (x + 8, y + h - 34, w - 16, 9))
    # lights
    pygame.draw.rect(surf, (255, 255, 120), (x + 3, y + 3, 11, 6))
    pygame.draw.rect(surf, (255, 255, 120), (x + w - 14, y + 3, 11, 6))
    # wheels
    pygame.draw.rect(surf, (20, 20, 20), (x - 3, y + 14, 6, 15))
    pygame.draw.rect(surf, (20, 20, 20), (x + w - 3, y + 14, 6, 15))
    pygame.draw.rect(surf, (20, 20, 20), (x - 3, y + h - 28, 6, 15))
    pygame.draw.rect(surf, (20, 20, 20), (x + w - 3, y + h - 28, 6, 15))
    if name and font:
        label = font.render(name[:10], True, WHITE)
        surf.blit(label, (x + w // 2 - label.get_width() // 2, y - 16))


def draw_road(surf, offset):
    surf.fill(GRASS)
    pygame.draw.rect(surf, ROAD, (ROAD_LEFT, 0, ROAD_RIGHT - ROAD_LEFT, HEIGHT))
    # edges
    pygame.draw.line(surf, WHITE, (ROAD_LEFT, 0), (ROAD_LEFT, HEIGHT), 5)
    pygame.draw.line(surf, WHITE, (ROAD_RIGHT, 0), (ROAD_RIGHT, HEIGHT), 5)
    # lanes
    dash_len, gap = 28, 22
    period = dash_len + gap
    for i in range(1, LANE_COUNT):
        x = int(ROAD_LEFT + i * LANE_W)
        start = int(-offset) % period
        y = start - period
        while y < HEIGHT:
            pygame.draw.line(surf, LANE_MARK, (x, y), (x, y + dash_len), 4)
            y += period


# ---------- Screens ----------
def login_screen(screen, clock, font, big_font):
    """Returns (username, multiplayer?, host, port) or None if quit."""
    name = ""
    host = HOST_DEFAULT
    port_str = str(PORT_DEFAULT)
    mode = "single"  # single | multi
    field = "name"   # name | host | port
    error = ""
    blink = 0

    while True:
        blink = (blink + 1) % 60
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return None
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    return None
                if event.key == pygame.K_TAB:
                    if mode == "multi":
                        order = ["name", "host", "port"]
                        field = order[(order.index(field) + 1) % 3]
                    else:
                        field = "name"
                elif event.key == pygame.K_RETURN:
                    if not name.strip():
                        error = "Enter a login ID / name"
                        continue
                    if mode == "multi":
                        try:
                            p = int(port_str)
                        except ValueError:
                            error = "Invalid port"
                            continue
                        return name.strip()[:16], True, host.strip() or HOST_DEFAULT, p
                    return name.strip()[:16], False, None, None
                elif event.key == pygame.K_BACKSPACE:
                    if field == "name":
                        name = name[:-1]
                    elif field == "host":
                        host = host[:-1]
                    else:
                        port_str = port_str[:-1]
                elif event.key == pygame.K_1:
                    mode = "single"
                    field = "name"
                    error = ""
                elif event.key == pygame.K_2:
                    mode = "multi"
                    error = ""
                else:
                    ch = event.unicode
                    if ch and ch.isprintable() and len(ch) == 1:
                        if field == "name" and len(name) < 16:
                            name += ch
                        elif field == "host" and len(host) < 40:
                            host += ch
                        elif field == "port" and ch.isdigit() and len(port_str) < 5:
                            port_str += ch

        # Draw
        screen.fill(BLACK)
        title = big_font.render("FAST ND PRAISE", True, CYAN)
        screen.blit(title, (WIDTH // 2 - title.get_width() // 2, 50))
        sub = font.render("Neon Highway Racing", True, (120, 120, 160))
        screen.blit(sub, (WIDTH // 2 - sub.get_width() // 2, 100))

        # Mode buttons
        for i, (label, m) in enumerate([("1  Single Player", "single"), ("2  Multiplayer", "multi")]):
            col = CYAN if mode == m else GRAY
            t = font.render(label, True, col)
            screen.blit(t, (WIDTH // 2 - 100, 160 + i * 36))

        y0 = 260
        # Name
        lbl = font.render("Login ID:", True, YELLOW)
        screen.blit(lbl, (80, y0))
        box_col = CYAN if field == "name" else GRAY
        pygame.draw.rect(screen, box_col, (80, y0 + 28, 320, 36), 2, border_radius=6)
        txt = font.render(name + ("|" if field == "name" and blink < 30 else ""), True, WHITE)
        screen.blit(txt, (90, y0 + 34))

        if mode == "multi":
            # Host
            lbl = font.render("Server IP:", True, YELLOW)
            screen.blit(lbl, (80, y0 + 80))
            box_col = CYAN if field == "host" else GRAY
            pygame.draw.rect(screen, box_col, (80, y0 + 108, 320, 36), 2, border_radius=6)
            txt = font.render(host + ("|" if field == "host" and blink < 30 else ""), True, WHITE)
            screen.blit(txt, (90, y0 + 114))

            # Port
            lbl = font.render("Port:", True, YELLOW)
            screen.blit(lbl, (80, y0 + 160))
            box_col = CYAN if field == "port" else GRAY
            pygame.draw.rect(screen, box_col, (80, y0 + 188, 120, 36), 2, border_radius=6)
            txt = font.render(port_str + ("|" if field == "port" and blink < 30 else ""), True, WHITE)
            screen.blit(txt, (90, y0 + 194))

        if error:
            err = font.render(error, True, RED)
            screen.blit(err, (WIDTH // 2 - err.get_width() // 2, HEIGHT - 120))

        hint = font.render("Enter = Start   Tab = next field   Esc = Quit", True, (100, 100, 130))
        screen.blit(hint, (WIDTH // 2 - hint.get_width() // 2, HEIGHT - 50))

        pygame.display.flip()
        clock.tick(30)


def game_over_screen(screen, clock, font, big_font, score, best, multi):
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return "quit"
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_r or event.key == pygame.K_RETURN:
                    return "retry"
                if event.key == pygame.K_ESCAPE or event.key == pygame.K_m:
                    return "menu"

        screen.fill(BLACK)
        t = big_font.render("CRASHED!", True, RED)
        screen.blit(t, (WIDTH // 2 - t.get_width() // 2, 180))
        s = font.render(f"Score: {score}", True, YELLOW)
        screen.blit(s, (WIDTH // 2 - s.get_width() // 2, 260))
        b = font.render(f"Best: {best}", True, CYAN)
        screen.blit(b, (WIDTH // 2 - b.get_width() // 2, 300))
        if multi:
            m = font.render("Other players are still racing!", True, (150, 150, 180))
            screen.blit(m, (WIDTH // 2 - m.get_width() // 2, 350))
        h = font.render("R / Enter = Retry    M / Esc = Menu", True, WHITE)
        screen.blit(h, (WIDTH // 2 - h.get_width() // 2, 420))
        pygame.display.flip()
        clock.tick(30)


# ---------- Main game ----------
def run_game(username, multi, host, port):
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption(f"Fast ND Praise – {username}")
    clock = pygame.time.Clock()
    font = pygame.font.SysFont("segoeui", 20)
    small = pygame.font.SysFont("segoeui", 16)
    big = pygame.font.SysFont("segoeui", 42, bold=True)

    net = NetClient()
    if multi:
        ok, msg = net.connect(host, port, username)
        if not ok:
            # Show error briefly then fall back to single
            screen.fill(BLACK)
            t = font.render(f"Connect failed: {msg}", True, RED)
            screen.blit(t, (WIDTH // 2 - t.get_width() // 2, HEIGHT // 2 - 20))
            t2 = font.render("Starting single-player...", True, WHITE)
            screen.blit(t2, (WIDTH // 2 - t2.get_width() // 2, HEIGHT // 2 + 20))
            pygame.display.flip()
            pygame.time.wait(2000)
            multi = False

    # Wait a moment for welcome packet
    if multi:
        for _ in range(20):
            if net.my_id:
                break
            time.sleep(0.05)

    color = PLAYER_COLORS[net.my_color_idx % len(PLAYER_COLORS)] if multi else PLAYER_COLORS[0]
    player = Player(WIDTH // 2 - 21, HEIGHT - 130, color)
    traffic = []
    spawn_timer = 0
    spawn_every = 70
    score = 0
    best = 0
    try:
        with open("/tmp/fast_nd_praise_best.txt") as f:
            best = int(f.read().strip() or 0)
    except Exception:
        pass

    road_offset = 0.0
    running = True
    paused = False
    state_send_timer = 0
    crashed = False

    while running:
        dt = clock.tick(FPS)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
                if event.key == pygame.K_SPACE:
                    paused = not paused
                if event.key == pygame.K_r and crashed:
                    # retry
                    player = Player(WIDTH // 2 - 21, HEIGHT - 130, color)
                    traffic = []
                    score = 0
                    road_offset = 0
                    crashed = False
                    paused = False

        if crashed:
            action = game_over_screen(screen, clock, font, big, score, best, multi)
            if action == "quit":
                running = False
            elif action == "menu":
                net.close()
                return "menu"
            else:
                player = Player(WIDTH // 2 - 21, HEIGHT - 130, color)
                traffic = []
                score = 0
                road_offset = 0
                crashed = False
                paused = False
            continue

        if paused:
            screen.fill(BLACK)
            t = big.render("PAUSED", True, CYAN)
            screen.blit(t, (WIDTH // 2 - t.get_width() // 2, HEIGHT // 2 - 30))
            h = font.render("Space = Resume", True, WHITE)
            screen.blit(h, (WIDTH // 2 - h.get_width() // 2, HEIGHT // 2 + 30))
            pygame.display.flip()
            continue

        keys = pygame.key.get_pressed()
        player.update(keys)
        road_offset = (road_offset + player.speed) % 50

        # Score
        score += int(player.speed * 0.35)
        if score > best:
            best = score
            try:
                with open("/tmp/fast_nd_praise_best.txt", "w") as f:
                    f.write(str(best))
            except Exception:
                pass

        # AI traffic (single + multi both have some bots for density)
        spawn_timer += 1
        if spawn_timer >= spawn_every:
            spawn_timer = 0
            spawn_every = max(28, 70 - score // 600)
            traffic.append(TrafficCar())

        for car in traffic[:]:
            car.update(player.speed)
            if car.offscreen():
                traffic.remove(car)
            elif player.rect().colliderect(car.rect()):
                crashed = True

        # Multiplayer state
        if multi and net.connected:
            state_send_timer += 1
            if state_send_timer >= 3:  # ~20 Hz
                state_send_timer = 0
                net.send_state(player.x, player.y, player.speed)

            others = net.get_others()
            for oid, op in others.items():
                # simple collision with other players
                r = pygame.Rect(op["x"], op["y"], 42, 72)
                if player.rect().colliderect(r):
                    crashed = True
        else:
            others = {}

        # Draw
        draw_road(screen, road_offset)

        for car in traffic:
            draw_car(screen, car.x, car.y, car.w, car.h, car.color)

        for oid, op in others.items():
            cidx = op.get("color_idx", 1) % len(PLAYER_COLORS)
            draw_car(screen, op["x"], op["y"], 42, 72, PLAYER_COLORS[cidx],
                     op.get("name"), small)

        draw_car(screen, player.x, player.y, player.w, player.h, player.color, username, small)

        # HUD
        pygame.draw.rect(screen, (0, 0, 0, 120), (0, 0, WIDTH, 48))
        screen.blit(font.render(f"Score {score}", True, YELLOW), (12, 12))
        screen.blit(font.render(f"Speed {int(player.speed * 9)}", True, CYAN), (160, 12))
        screen.blit(font.render(f"Best {best}", True, WHITE), (300, 12))
        if multi:
            status = "ONLINE" if net.connected else "OFFLINE"
            col = (68, 255, 136) if net.connected else RED
            screen.blit(small.render(status, True, col), (WIDTH - 70, 14))
            screen.blit(small.render(f"Players {1 + len(others)}", True, WHITE), (WIDTH - 160, 14))

        # Chat log
        if multi:
            for i, line in enumerate(net.get_chat()):
                screen.blit(small.render(line, True, (180, 180, 200)), (10, HEIGHT - 30 - i * 18))

        # Controls hint
        if score < 80:
            screen.blit(small.render("W/↑ accel  S/↓ brake  ←→ steer  Space pause", True, (100, 100, 120)),
                        (WIDTH // 2 - 160, HEIGHT - 24))

        pygame.display.flip()

    net.close()
    pygame.quit()
    return "quit"


def main():
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Fast ND Praise")
    clock = pygame.time.Clock()
    font = pygame.font.SysFont("segoeui", 22)
    big = pygame.font.SysFont("segoeui", 40, bold=True)

    while True:
        result = login_screen(screen, clock, font, big)
        if result is None:
            break
        username, multi, host, port = result
        action = run_game(username, multi, host, port)
        if action == "quit":
            break

    pygame.quit()
    sys.exit(0)


if __name__ == "__main__":
    main()
