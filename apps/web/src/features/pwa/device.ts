export type Platform = 'ios' | 'android' | 'desktop';
export type Browser = 'safari' | 'chrome' | 'edge' | 'firefox' | 'samsung' | 'other';

export interface DeviceInfo {
  platform: Platform;
  browser: Browser;
  /** iOS/iPadOS no Safari: único navegador que instala PWAs na tela inicial. */
  isIosSafari: boolean;
  /** Navegadores que expõem o prompt de instalação (beforeinstallprompt). */
  isChromium: boolean;
}

// Navegadores de terceiros e webviews no iOS: nenhum deles instala PWAs.
const IOS_NON_SAFARI =
  /CriOS|FxiOS|EdgiOS|OPiOS|OPT\/|GSA|FBAN|FBAV|Instagram|Line\/|MicroMessenger/;

/** Detecta SO e navegador por User Agent + features (iPadOS se identifica como Mac). */
export function detectDevice(
  ua: string = navigator.userAgent,
  maxTouchPoints: number = navigator.maxTouchPoints,
): DeviceInfo {
  const isIos = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const platform: Platform = isIos ? 'ios' : isAndroid ? 'android' : 'desktop';

  let browser: Browser = 'other';
  if (/Edg(e|A|iOS)?\//.test(ua)) browser = 'edge';
  else if (/SamsungBrowser/.test(ua)) browser = 'samsung';
  else if (/Firefox|FxiOS/.test(ua)) browser = 'firefox';
  else if (/OPR\/|OPiOS/.test(ua)) browser = 'other';
  else if (/Chrome|CriOS|Chromium/.test(ua)) browser = 'chrome';
  else if (/Safari/.test(ua)) browser = 'safari';

  const isIosSafari = isIos && /Safari/.test(ua) && !IOS_NON_SAFARI.test(ua);

  return {
    platform,
    browser: isIos ? (isIosSafari ? 'safari' : browser) : browser,
    isIosSafari,
    isChromium: !isIos && (browser === 'chrome' || browser === 'edge' || browser === 'samsung'),
  };
}
