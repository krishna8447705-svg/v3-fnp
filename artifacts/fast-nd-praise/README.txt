FAST ND PRAISE – Car Racing Game
================================

Python multiplayer car racing game with login ID.

REQUIREMENTS
------------
- Python 3.8+
- pygame  (install:  pip install pygame)

HOW TO PLAY
-----------

1) SINGLE PLAYER (easiest)
   python client.py
   - Choose option 1
   - Type a Login ID (your name)
   - Press Enter

2) MULTIPLAYER
   a) Start the server first (on one machine):
        python server.py

   b) On each player PC, run:
        python client.py
      - Choose option 2 (Multiplayer)
      - Enter Login ID
      - Server IP:  127.0.0.1   (same PC)
                    or the host's LAN IP (other PCs)
      - Port: 5555
      - Press Enter

CONTROLS
--------
  W / ↑     Accelerate
  S / ↓     Brake
  ← / →     Steer left / right
  A / D     Also steer
  Space     Pause
  R         Restart after crash
  Esc       Quit / back to menu

FEATURES
--------
- Login ID (username)
- Single-player endless highway
- Multiplayer server (see other racers live)
- Traffic cars to dodge
- Score + local best score
- Neon style road & cars

TIPS
----
- For multiplayer on the same computer, open multiple
  terminals and run client.py several times.
- Firewall may block port 5555 – allow it for LAN play.
- Server must stay running while people are playing.
