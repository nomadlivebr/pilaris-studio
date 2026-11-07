"""Gera os ícones e as splash screens do PWA a partir do símbolo "P" da marca.

Uso (a partir de apps/web):  python scripts/generate-pwa-assets.py
Requer Pillow. O desenho do "P" replica public/favicon.svg / logo-mark.tsx.
Saída: public/icons/*.png, public/splash/*.png e scripts/pwa-head.generated.html (tags <link> do iOS).
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent / "public"
NAVY = (6, 27, 54)  # #061B36
BLUE = (8, 127, 173)  # #087FAD
TURQUOISE = (0, 213, 197)  # #00D5C5
SS = 4  # supersampling para bordas suaves


def gradient(size: int) -> Image.Image:
    """Degradê azul -> turquesa na mesma direção do logo (canto inf. esq. -> sup. dir.)."""
    n = 128
    img = Image.new("RGB", (n, n))
    px = img.load()
    # Vetor do gradiente no viewBox 48: (8,42) -> (40,6)
    x0, y0, x1, y1 = 8, 42, 40, 6
    dx, dy = x1 - x0, y1 - y0
    den = dx * dx + dy * dy
    for j in range(n):
        for i in range(n):
            u, v = i / (n - 1) * 48, j / (n - 1) * 48
            t = max(0.0, min(1.0, ((u - x0) * dx + (v - y0) * dy) / den))
            px[i, j] = tuple(round(BLUE[k] + (TURQUOISE[k] - BLUE[k]) * t) for k in range(3))
    return img.resize((size, size), Image.BILINEAR)


def mark(size: int) -> Image.Image:
    """Símbolo "P" em RGBA, num quadrado `size` (correspondente ao viewBox 48x48)."""
    s = size * SS
    k = s / 48
    mask = Image.new("L", (s, s), 0)
    d = ImageDraw.Draw(mask)
    box = lambda x0, y0, x1, y1: d.rectangle([x0 * k, y0 * k, x1 * k, y1 * k], fill=255)
    box(10.5, 6, 17.5, 42)  # haste
    box(10.5, 6, 26.25, 13)  # barra superior
    box(14, 27.5, 26.25, 34.5)  # barra inferior do bojo
    # bojo: meia-coroa à direita (raio externo 14.25, interno 7.25, centro 26.25,20.25)
    cx, cy = 26.25, 20.25
    ring = Image.new("L", (s, s), 0)
    rd = ImageDraw.Draw(ring)
    rd.ellipse([(cx - 14.25) * k, (cy - 14.25) * k, (cx + 14.25) * k, (cy + 14.25) * k], fill=255)
    rd.ellipse([(cx - 7.25) * k, (cy - 7.25) * k, (cx + 7.25) * k, (cy + 7.25) * k], fill=0)
    rd.rectangle([0, 0, cx * k, s], fill=0)  # só o lado direito
    mask.paste(255, mask=ring)
    mask = mask.resize((size, size), Image.LANCZOS)
    out = gradient(size).convert("RGBA")
    out.putalpha(mask)
    return out


def square_icon(size: int, mark_ratio: float) -> Image.Image:
    img = Image.new("RGB", (size, size), NAVY)
    m = round(size * mark_ratio)
    glyph = mark(m)
    # O "P" ocupa x 10.5–40.5 e y 6–42 de 48: centraliza o desenho, não o viewBox.
    off_x = (size - m) // 2 + round(m * (24 - 25.5) / 48)
    off_y = (size - m) // 2 + round(m * (24 - 24) / 48)
    img.paste(glyph, (off_x, off_y), glyph)
    return img


def font(name: str, px: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(f"C:/Windows/Fonts/{name}", px)


def spaced(d: ImageDraw.ImageDraw, cx: int, y: int, text: str, f, fill, tracking: int):
    widths = [d.textlength(c, font=f) for c in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = cx - total / 2
    for c, w in zip(text, widths):
        d.text((x, y), c, font=f, fill=fill)
        x += w + tracking


def splash(w: int, h: int) -> Image.Image:
    img = Image.new("RGB", (w, h), NAVY)
    base = min(w, h)
    m = round(base * 0.30)
    glyph = mark(m)
    gx = (w - m) // 2 + round(m * (24 - 25.5) / 48)
    gy = round(h * 0.42 - m / 2)
    img.paste(glyph, (gx, gy), glyph)
    d = ImageDraw.Draw(img)
    title = font("seguisb.ttf", round(base * 0.062))
    sub = font("segoeui.ttf", round(base * 0.036))
    ty = gy + m + round(base * 0.06)
    spaced(d, w // 2, ty, "PILARIS", title, (255, 255, 255), round(base * 0.02))
    spaced(d, w // 2, ty + round(base * 0.085), "STUDIO", sub, TURQUOISE, round(base * 0.035))
    return img


# (largura px, altura px, largura css, altura css, dpr)
DEVICES = [
    (1320, 2868, 440, 956, 3),  # iPhone 16 Pro Max
    (1206, 2622, 402, 874, 3),  # iPhone 16 Pro
    (1290, 2796, 430, 932, 3),  # iPhone 16 Plus / 15 Pro Max / 15 Plus / 14 Pro Max
    (1179, 2556, 393, 852, 3),  # iPhone 16 / 15 Pro / 15 / 14 Pro
    (1170, 2532, 390, 844, 3),  # iPhone 14 / 13 / 12
    (1125, 2436, 375, 812, 3),  # iPhone 13 mini / 12 mini / 11 Pro / X
    (1242, 2688, 414, 896, 3),  # iPhone 11 Pro Max / XS Max
    (828, 1792, 414, 896, 2),  # iPhone 11 / XR
    (1242, 2208, 414, 736, 3),  # iPhone 8 Plus
    (750, 1334, 375, 667, 2),  # iPhone 8 / SE
    (1620, 2160, 810, 1080, 2),  # iPad 10.2"
    (1640, 2360, 820, 1180, 2),  # iPad Air 10.9" / iPad 10
    (1668, 2224, 834, 1112, 2),  # iPad Pro 10.5"
    (1668, 2388, 834, 1194, 2),  # iPad Pro 11"
    (2048, 2732, 1024, 1366, 2),  # iPad Pro 12.9"
    (1488, 2266, 744, 1133, 2),  # iPad mini 6
]


def main() -> None:
    icons = ROOT / "icons"
    splashes = ROOT / "splash"
    icons.mkdir(parents=True, exist_ok=True)
    splashes.mkdir(parents=True, exist_ok=True)

    square_icon(192, 0.72).save(icons / "icon-192.png", optimize=True)
    square_icon(512, 0.72).save(icons / "icon-512.png", optimize=True)
    # Maskable: conteúdo dentro da zona segura (círculo de 80% do ícone).
    square_icon(512, 0.54).save(icons / "icon-maskable-512.png", optimize=True)
    square_icon(180, 0.72).save(icons / "apple-touch-icon.png", optimize=True)
    square_icon(32, 0.80).save(icons / "favicon-32.png", optimize=True)
    square_icon(48, 0.80).save(
        ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)]
    )

    links = []
    for w, h, cw, ch, dpr in DEVICES:
        name = f"splash-{w}x{h}.png"
        splash(w, h).save(splashes / name, optimize=True)
        media = (
            f"(device-width: {cw}px) and (device-height: {ch}px) "
            f"and (-webkit-device-pixel-ratio: {dpr}) and (orientation: portrait)"
        )
        links.append(
            f'<link rel="apple-touch-startup-image" media="{media}" href="/splash/{name}" />'
        )
    (ROOT.parent / "scripts" / "pwa-head.generated.html").write_text("\n".join(links) + "\n", encoding="utf-8")
    print("ok:", len(DEVICES), "splash screens")


if __name__ == "__main__":
    main()
