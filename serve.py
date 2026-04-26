"""
SSI Instructor Prep — local server with state sync.

Serves static files (like `python -m http.server`) AND adds two endpoints:
  GET  /state  → returns contents of state/state.json (or {} if missing)
  POST /state  → writes JSON body to state/state.json

The frontend (app.js) autoloads from /state on boot and autosaves to /state
on every change, so all drill history / mastered / log / theme syncs across
machines via Dropbox (state.json lives in the app folder).

Run:  python serve.py            # default port 8765
      python serve.py 8080       # custom port
"""
import http.server
import json
import os
import sys
from socketserver import ThreadingMixIn

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
BASE = os.path.dirname(os.path.abspath(__file__))
STATE_DIR = os.path.join(BASE, "state")
STATE_FILE = os.path.join(STATE_DIR, "state.json")

os.makedirs(STATE_DIR, exist_ok=True)


class Handler(http.server.SimpleHTTPRequestHandler):
    # Serve files from the app folder, not CWD
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=BASE, **kw)

    def end_headers(self):
        # Prevent any caching of state endpoint AND aggressive caching of HTML/JS during dev
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()

    def do_GET(self):
        if self.path.split("?", 1)[0] == "/state":
            try:
                with open(STATE_FILE, "r", encoding="utf-8") as f:
                    body = f.read()
                # Sanity-check it's valid JSON before serving
                json.loads(body)
            except (FileNotFoundError, json.JSONDecodeError):
                body = "{}"
            data = body.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        return super().do_GET()

    def do_POST(self):
        if self.path.split("?", 1)[0] == "/state":
            length = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(length)
            try:
                # Validate JSON
                payload = json.loads(raw.decode("utf-8"))
                if not isinstance(payload, dict):
                    raise ValueError("expected JSON object")
            except (json.JSONDecodeError, ValueError) as e:
                self.send_error(400, f"Invalid JSON: {e}")
                return
            # Atomic write: write to tmp, then replace
            tmp_path = STATE_FILE + ".tmp"
            with open(tmp_path, "w", encoding="utf-8") as f:
                json.dump(payload, f, ensure_ascii=False, indent=2)
            os.replace(tmp_path, STATE_FILE)
            ok = b'{"ok":true}'
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(ok)))
            self.end_headers()
            self.wfile.write(ok)
            return
        self.send_error(404, "Not found")

    def log_message(self, format, *args):
        # Quieter logs — only log non-200 responses
        if args and len(args) >= 2:
            try:
                code = int(args[1])
                if 200 <= code < 300:
                    return
            except (ValueError, IndexError):
                pass
        super().log_message(format, *args)


class ThreadingServer(ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True


if __name__ == "__main__":
    print(f"SSI Instructor Prep — serving {BASE}")
    print(f"State file: {STATE_FILE}")
    print(f"Open http://localhost:{PORT}")
    try:
        ThreadingServer(("", PORT), Handler).serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")
