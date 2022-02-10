import { Map, View } from "ol";
import { Tile, Vector } from "ol/layer";
import { OSM } from "ol/source";
import vectorSource from "../modules/vectorSource/model";

export const map = new Map({
  layers: [
    new Tile({
      source: new OSM(),
    }),
    new Vector({
      source: vectorSource,
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
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
