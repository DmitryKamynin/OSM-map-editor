import { XYZ } from "ol/source";
import { Tile } from "ol/layer";

const bounds = {
  16: [
    [31086, 31087],
    [24949, 24949],
  ],
  17: [
    [62172, 62174],
    [49898, 49899],
  ],
  18: [
    [124345, 124348],
    [99797, 99799],
  ],
  19: [
    [248691, 248696],
    [199594, 199599],
  ],
  20: [
    [497382, 497393],
    [399188, 399199],
  ],
  21: [
    [994765, 994787],
    [798377, 798398],
  ],
  22: [
    [1989530, 1989574],
    [1596754, 1596797],
  ],
};

const xyz = new XYZ({
  tileUrlFunction(coord) {
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
    return `/r/${zoom}/${x}/${Math.pow(2, zoom) - y - 1}.png`;
  },
});

const tile1 = new Tile({
  properties: { name: "Ортофотоплан" },
  source: xyz,
  zIndex: 0,
});

export default tile1;
