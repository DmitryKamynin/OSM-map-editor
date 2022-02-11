import { Map, View } from "ol";
import { Tile, Vector } from "ol/layer";
import vectorSource from "../modules/vectorSource/model";
import tile1 from "./tile1";
import tile2 from "./tile2";
import { XYZ } from "ol/source";

export const map = new Map({
  layers: [
    new Tile({
      zIndex: 1,
      source: new XYZ({
        url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
      }),
    }),
    tile2,
    tile1,
    new Vector({
      zIndex: 10,
      source: vectorSource,
      properties: { name: "Полигоны", type: "checkbox" },
    }),
  ],
  view: new View({
    center: [-1028052.7980440954, 4780888.244162799],
    zoom: 19,
    // extent: [-1028334.0888415028, 4781039.118987968],
  }),
});

const MapComponent = (): JSX.Element => (
  <div
    className="map"
    ref={(div): void => {
      if (div) {
        div.style.width = "100%";
        div.style.height = "100%";
        map.setTarget(div);
      }
    }}
  />
);

export default MapComponent;
