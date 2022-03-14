import { Map, View } from "ol";
import { Tile, Vector, Image as ImageLayer } from "ol/layer";
import vectorSource from "../modules/vectorSource/model";
import tile1 from "./tile1";
import tile2 from "./tile2";
import { XYZ } from "ol/source";
import Static from "ol/source/ImageStatic";

export const map = new Map({
  layers: [
    new ImageLayer({
      source: new Static({
        url: "https://xn---35-6cdk1dnenygj.xn--p1ai/img/users/2019/11/4_ons_black_bg_1920x1080.png",
        imageExtent: [-1048241.6000163931, 4770738.924590799, -1007823.7915348014, 4791010.874184832],
      }),
    }),
    new Tile({
      opacity: 0.5,
      source: new XYZ({
        url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
      }),
    }),
    tile1,
    tile2,
    new Vector({
      zIndex: 10,
      source: vectorSource,
      properties: { name: "Zones" },
    }),
  ],
  view: new View({
    center: [-1028052.7980440954, 4780888.244162799],
    zoom: 19,
    maxZoom: 23,
    minZoom: 13,
    extent: [-1030468.3972696156, 4779586.104656608, -1027285.2988758341, 4781081.85475019],
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
