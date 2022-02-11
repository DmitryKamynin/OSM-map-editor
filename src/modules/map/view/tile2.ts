import { XYZ } from "ol/source";
import { Tile } from "ol/layer";

const bounds = {
  16: [
    [31086, 31087],
    [24949, 24949],
  ],
  17: [
    [62173, 62174],
    [49898, 49899],
  ],
  18: [
    [124346, 124348],
    [99797, 99799],
  ],
  19: [
    [248692, 248696],
    [199595, 199599],
  ],
  20: [
    [497384, 497392],
    [399191, 399198],
  ],
  21: [
    [994769, 994784],
    [798382, 798396],
  ],
  22: [
    [1989539, 1989569],
    [1596764, 1596792],
  ],
  23: [
    [3979078, 3979139],
    [3193529, 3193584],
  ],
};

const xyz = new XYZ({
  tileUrlFunction: (coord) => {
    const [zoom, x, y] = coord;
    if (
      zoom < 16 ||
      zoom > 22 ||
      // @ts-ignore
      bounds[zoom][0][0] > x ||
      // @ts-ignore
      x > bounds[zoom][0][1] ||
      // @ts-ignore
      bounds[zoom][1][0] > y ||
      // @ts-ignore
      y > bounds[zoom][1][1]
    ) {
      return "";
    }
    return `/r1/${zoom}/${x}/${Math.pow(2, zoom) - y - 1}.png`;
  },
});

const tile2 = new Tile({
  properties: { name: "Спутник" },
  zIndex: 2,
  source: xyz,
});

export default tile2;
