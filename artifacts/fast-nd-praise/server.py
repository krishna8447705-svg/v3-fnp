#!/usr/bin/env python3
"""
Fast ND Praise - Multiplayer Server
Run this first, then connect clients to it.
"""

import socket
import threading
import json
import time
import uuid

HOST = "0.0.0.0"
PORT = 5555
TICK_RATE = 20  # server updates per second

# player_id -> {name, x, y, speed, last_seen, color_idx}
players = {}
lock = threading.Lock()
next_color = 0
COLORS = ["#ff4466", "#ffaa00", "#aa66ff", "#44ff88", "#00f5ff", "#ff66aa"]


def broadcast(msg, exclude_id=None):
    data = (json.dumps(msg) + "\n").encode("utf-8")
    with lock:
        dead = []
        for pid, p in players.items():
            if pid == exclude_id:
                continue
            try:
                p["sock"].sendall(data)
            except Exception:
                dead.append(pid)
        for pid in dead:
            remove_player(pid)


def remove_player(pid):
    if pid in players:
        name = players[pid].get("name", "?")
        print(f"[LEAVE] {name} ({pid[:8]})")
        try:
            players[pid]["sock"].close()
        except Exception:
            pass
        del players[pid]
        broadcast({"type": "leave", "id": pid})


def handle_client(sock, addr):
    global next_color
    pid = str(uuid.uuid4())
    buffer = ""
    print(f"[CONNECT] {addr} -> {pid[:8]}")

    try:
        sock.settimeout(30.0)
        while True:
            chunk = sock.recv(4096)
            if not chunk:
                break
            buffer += chunk.decode("utf-8", errors="ignore")
            while "\n" in buffer:
                line, buffer = buffer.split("\n", 1)
                line = line.strip()
                if not line:
                    continue
                try:
                    msg = json.loads(line)
                except json.JSONDecodeError:
                    continue

                mtype = msg.get("type")

                if mtype == "login":
                    name = str(msg.get("name", "Racer"))[:16].strip() or "Racer"
                    with lock:
                        color_idx = next_color % len(COLORS)
                        next_color += 1
                        players[pid] = {
                            "name": name,
                            "x": 180,
                            "y": 480,
                            "speed": 0,
                            "sock": sock,
                            "color_idx": color_idx,
                            "last_seen": time.time(),
                        }
                    print(f"[LOGIN] {name} ({pid[:8]})")
                    # Welcome
                    sock.sendall((json.dumps({
                        "type": "welcome",
                        "id": pid,
                        "color_idx": color_idx,
                    }) + "\n").encode())
                    # Tell others
                    broadcast({
                        "type": "join",
                        "id": pid,
                        "name": name,
                        "color_idx": color_idx,
                    }, exclude_id=pid)
                    # Send existing players to new client
                    with lock:
                        others = [
                            {
                                "id": oid,
                                "name": p["name"],
                                "x": p["x"],
                                "y": p["y"],
                                "speed": p["speed"],
                                "color_idx": p["color_idx"],
                            }
                            for oid, p in players.items()
                            if oid != pid
                        ]
                    sock.sendall((json.dumps({
                        "type": "players",
                        "list": others,
                    }) + "\n").encode())

                elif mtype == "state":
                    with lock:
                        if pid not in players:
                            continue
                        players[pid]["x"] = float(msg.get("x", 180))
                        players[pid]["y"] = float(msg.get("y", 480))
                        players[pid]["speed"] = float(msg.get("speed", 0))
                        players[pid]["last_seen"] = time.time()

                elif mtype == "chat":
                    text = str(msg.get("text", ""))[:80]
                    with lock:
                        name = players.get(pid, {}).get("name", "?")
                    broadcast({
                        "type": "chat",
                        "name": name,
                        "text": text,
                    })

    except Exception as e:
        print(f"[ERROR] {pid[:8]}: {e}")
    finally:
        with lock:
            remove_player(pid)
        try:
            sock.close()
        except Exception:
            pass


def state_broadcaster():
    """Periodically send all player positions to everyone."""
    while True:
        time.sleep(1.0 / TICK_RATE)
        with lock:
            if not players:
                continue
            # Drop timed-out players
            now = time.time()
            dead = [pid for pid, p in players.items() if now - p["last_seen"] > 8]
            for pid in dead:
                remove_player(pid)

            snapshot = [
                {
                    "id": pid,
                    "name": p["name"],
                    "x": p["x"],
                    "y": p["y"],
                    "speed": p["speed"],
                    "color_idx": p["color_idx"],
                }
                for pid, p in players.items()
            ]
        if snapshot:
            broadcast({"type": "players", "list": snapshot})


def main():
    print("=" * 50)
    print("  FAST ND PRAISE  –  Multiplayer Server")
    print("=" * 50)
    print(f"  Listening on {HOST}:{PORT}")
    print("  Press Ctrl+C to stop")
    print("=" * 50)

    threading.Thread(target=state_broadcaster, daemon=True).start()

    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((HOST, PORT))
    server.listen(16)
    server.settimeout(1.0)

    try:
        while True:
            try:
                client, addr = server.accept()
                t = threading.Thread(target=handle_client, args=(client, addr), daemon=True)
                t.start()
            except socket.timeout:
                continue
    except KeyboardInterrupt:
        print("\n[SHUTDOWN] Server stopped.")
    finally:
        server.close()


if __name__ == "__main__":
    main()
