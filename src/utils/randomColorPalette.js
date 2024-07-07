function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function generateRandomColorPalette() {
  const colors = [];
  const baseHue = getRandomInt(0, 360); // Starting hue

  for (let i = 0; i < 7; i++) {
    const hue = (baseHue + i * (360 / 7)) % 360; // Distribute hues evenly around the circle
    const saturation = getRandomInt(50, 90); // Random saturation between 50% and 90%
    const lightness = getRandomInt(40, 70); // Random lightness between 40% and 70%
    
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
}

