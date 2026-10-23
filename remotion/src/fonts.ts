// Local, render-safe font loading. All font files are bundled under media/fonts,
// so neither composition discovery nor parallel render workers need Google Fonts.
// FontFace.load() deliberately runs without delayRender(): a worker can be recycled
// while a font promise is pending, and holding a render handle across that boundary
// can otherwise stall an otherwise healthy long render.
import { staticFile } from 'remotion';

const loaded: Record<string, Promise<void> | undefined> = {};

const loadLocalFont = (
  fontFamily: string,
  fileStem: string,
  weights: number[],
): string => {
  weights.forEach((weight) => {
    const key = `${fontFamily}-${weight}`;
    if (loaded[key]) return;
    const fontFace = new FontFace(
      fontFamily,
      `url(${staticFile(`fonts/${fileStem}-${weight}.woff2`)}) format('woff2')`,
      { style: 'normal', weight: String(weight), display: 'block' },
    );
    document.fonts.add(fontFace);
    loaded[key] = fontFace
      .load()
      .then(() => undefined)
      .catch((error) => {
        loaded[key] = undefined;
        console.error(`Unable to load bundled font ${key}`, error);
      });
  });
  return fontFamily;
};

export const FONT_DISPLAY = loadLocalFont('Space Grotesk', 'space-grotesk', [500, 600, 700]);
export const FONT_BODY = loadLocalFont('Inter', 'inter', [400, 500, 600]);
export const FONT_MONO = loadLocalFont('JetBrains Mono', 'jetbrains-mono', [400, 500, 700]);
export const FONT_SERIF = loadLocalFont('Spectral', 'spectral', [500, 600]);
export const FONT_EDITORIAL = loadLocalFont('Source Serif 4', 'source-serif-4', [600, 700, 900]);
