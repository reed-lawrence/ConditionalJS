/**
   * [NOT IMPLEMENTED (WIP)]
   * Function to calculate color based on a percentile position
   * @param {number[]} numberArray 
   * @param {number} percentile 
   */
export function percentile(numberArray: number[], percentile: number) {
  const array: number[] = JSON.parse(JSON.stringify(numberArray));
  array.sort((a, b) => a > b ? -1 : a < b ? 1 : 0);
  const count = array.length;

  // percentile position is number in array + 1 position multiplied by the percentile
  const position = (count + 1) * percentile;

  // if the position is a whole number, return that number as the percentile placement
  if (position % 1 === 0) {
    const percentile = array[position];
    console.log('percentile: ' + percentile);
    return percentile;
  } else {
    const posRoundUp = Math.ceil(position);
    const percentile = array[posRoundUp];
    console.log('percentile: ' + percentile);
    return percentile;
  }
}

/**
 * 
 * @param c 
 */
export function hex(c: number) {
  const s = '0123456789abcdef';

  let i = c;
  if (i === 0 || isNaN(c)) {
    return '00';
  }
  i = Math.round(Math.min(Math.max(0, i), 255));
  return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
}

/* Convert an RGB triplet to a hex string */
export function convertToHex(rgb: number[]) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
export function trim(s: string) {
  return (s.charAt(0) === '#') ? s.substring(1, 7) : s;
}

export function convertToRGB(hex: string) {
  const color: number[] = [];
  color[0] = parseInt((trim(hex)).substring(0, 2), 16);
  color[1] = parseInt((trim(hex)).substring(2, 4), 16);
  color[2] = parseInt((trim(hex)).substring(4, 6), 16);
  return color;
}

export function twoWayGradient(colorStart: string, colorEnd: string, colorCount: number) {

  // The beginning of your gradient
  const start = convertToRGB(colorEnd);

  // The end of your gradient
  const end = convertToRGB(colorStart);

  // The number of colors to generate
  const len = colorCount;

  // Alpha blending amount
  let alpha = 0.0;

  const hexarr = [];

  for (let i = 0; i < len; i++) {
    const c = [];
    alpha += (1.0 / len);

    c[0] = start[0] * alpha + (1 - alpha) * end[0];
    c[1] = start[1] * alpha + (1 - alpha) * end[1];
    c[2] = start[2] * alpha + (1 - alpha) * end[2];

    hexarr.push('#' + convertToHex(c));

  }
  return hexarr;
}

export function threeWayGradient(colorStart: string, colorMiddle: string, colorEnd: string, colorCount: number) {
  if (colorCount === 1) {
    return [colorEnd];
  } else if (colorCount === 2) {
    return [colorStart, colorEnd];
  } else if (colorCount === 3) {
    return [colorStart, colorMiddle, colorEnd];
  } else if (colorCount % 2 === 0) {
    colorCount++;
  }


  // Divide by two because the two way gradient creates a color list of the full length passed to it
  const _colorCount = colorCount / 2;

  const ar1 = twoWayGradient(colorStart, colorMiddle, _colorCount);
  const ar2 = twoWayGradient(colorMiddle, colorEnd, _colorCount);

  const output = [];

  output.push(colorStart);

  for (let i = 0; i < ar1.length; i++) {
    output.push(ar1[i]);
  }

  for (let i = 0; i < ar2.length; i++) {
    if (output.findIndex(c => c === ar2[i]) === -1) {
      output.push(ar2[i]);
    }
  }
  return output;
}

export function getConditionalValueColor(value: number, min: number, max: number, colorArray: string[]) {
  if (value === max) {
    return colorArray[colorArray.length - 1];
  }
  const step = (max - min) / colorArray.length;
  let cIndex = 0;
  for (let i = min; i < max; i += step) {
    if (i === min) {
      if (value <= i + step) {
        return colorArray[cIndex];
      }
    } else if (i === max - step) {
      if (value >= max - step) {
        return colorArray[cIndex];
      }
    } else {
      if (value > i && value < i + step) {
        return colorArray[cIndex];
      } else if (value === i) {
        return colorArray[cIndex];
      }
    }
    cIndex++;
  }
}

export const materialColors = ['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5',
  '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726',
  '#FF7043', '#8D6E63', '#BDBDBD', '#78909C'
];

export function getRandomMaterialDesignColor(previouslyGenerated: string[]) {

  // clean the array
  if (previouslyGenerated.length === materialColors.length) {
    previouslyGenerated = [];
  }


  for (let i = 0; i < materialColors.length; i++) {
    const randomIndex = Math.floor(Math.random() * materialColors.length);
    const chosenColor = materialColors[randomIndex];

    // ensure the color hasn't been picked recently
    if (previouslyGenerated.findIndex(c => c === chosenColor) === -1) {
      return chosenColor;
    }
  }
}
