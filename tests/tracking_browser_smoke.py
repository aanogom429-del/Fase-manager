"""Browser smoke test for the 1.40 RC. Run: python tests/tracking_browser_smoke.py."""
import functools
import http.server
import threading
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
thread = threading.Thread(target=server.serve_forever, daemon=True)
thread.start()
url = f"http://127.0.0.1:{server.server_port}/index.html"

try:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for name, viewport in [("desktop", {"width":1280,"height":900}),
                               ("mobile-viewport", {"width":390,"height":844})]:
            page = browser.new_page(viewport=viewport)
            errors = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.on("console", lambda msg: errors.append(msg.text) if
                    msg.type == "error" and "FASE MANAGER" in msg.text else None)
            page.goto(url, wait_until="domcontentloaded")
            expect(page.locator("#pitch")).to_be_visible()
            expect(page.locator("#players > g.player")).to_have_count(22)
            page.get_by_text("Fase Tracking 1.42", exact=False).first.click()
            expect(page.locator("#ft-enabled")).not_to_be_checked()
            expect(page.locator("#ft-hybrid-state")).to_contain_text("Motor original")
            expect(page.locator("#ft-collective")).to_be_disabled()
            page.locator("#ft-calibrate").click()
            expect(page.locator("#ft-enabled")).to_be_checked()
            expect(page.locator("#ft-hybrid-state")).to_contain_text("Prueba libre calibrada")
            expect(page.locator("#ft-state")).to_contain_text("Ventanas")
            page.locator("#speed").select_option("2")
            page.wait_for_function("document.getElementById('clock').textContent !== '00:00'", timeout=15000)
            page.locator("#pause").click()
            paused = page.locator("#clock").inner_text()
            page.wait_for_timeout(400)
            assert page.locator("#clock").inner_text() == paused, "Clock moved while paused"
            page.locator("#pause").click()
            page.locator("#ft-role").click()
            expect(page.locator("#ft-hybrid-state")).to_contain_text("perfiles por puesto")
            for formation in ("4-3-3","4-2-3-1","4-4-2","3-4-3","3-5-2"):
                page.locator("#system-blue").select_option(formation)
                page.locator("#system-red").select_option(formation)
                page.wait_for_timeout(150)
            page.locator("#ft-return").click()
            expect(page.locator("#ft-hybrid-state")).to_contain_text("Motor original")
            page.locator("#ft-enabled").uncheck()
            expect(page.locator("#ft-state")).to_contain_text("Desactivado")
            page.locator("#mode").click()
            page.wait_for_timeout(300)
            assert "ERROR DEL MOTOR" not in page.locator("#status").inner_text()
            assert not errors, errors
            print(f"PASS {name}: SVG, activation, formations, pause, rollback, JS errors")
            page.close()
        browser.close()
finally:
    server.shutdown()
    server.server_close()
