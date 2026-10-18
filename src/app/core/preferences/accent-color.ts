export function isAccentColor(value: string | null): value is string {
  return value !== null && /^#[0-9a-f]{6}$/i.test(value);
}

/** Select the higher-contrast text color for custom filled controls. */
export function accentTextColor(hex: string): '#ffffff' | '#000000' {
  const channels = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255);
  const linear = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  const luminance = linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  return luminance > 0.179 ? '#000000' : '#ffffff';
}
