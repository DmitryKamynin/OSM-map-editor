import { XYZ } from "ol/source";
import { Tile } from "ol/layer";

const bounds = {
  13: [
    [3885, 3885],
    [3118, 3118],
  ],
  14: [
    [7770, 7771],
    [6237, 6237],
  ],
  15: [
    [15541, 15543],
    [12474, 12475],
  ],
  16: [
    [31083, 31087],
    [24949, 24951],
  ],
  17: [
    [62166, 62175],
    [49898, 49903],
  ],
  18: [
    [124332, 124351],
    [99797, 99807],
  ],
  19: [
    [248664, 248703],
    [199594, 199614],
  ],
  20: [
    [497329, 497406],
    [399189, 399229],
  ],
  21: [
    [994658, 994812],
    [798378, 798458],
  ],
  22: [
    [1989316, 1989624],
    [1596756, 1596917],
  ],
  23: [
    [3978632, 3979248],
    [3193512, 3193835],
  ],
};

const xyz = new XYZ({
  tileUrlFunction: (coord) => {
    const [zoom, x, y] = coord;
    if (
      zoom < 13 ||
      zoom > 23 ||
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
    return `/main-map/${zoom}/${x}/${Math.pow(2, zoom) - y - 1}.png`;
  },
});

const tile2 = new Tile({
  properties: { name: "Photo" },
  source: xyz,
});

export default tile2;
