import { Fill, Stroke, Style, Circle, Icon } from "ol/style";
import { LineString, MultiPoint, Polygon } from "ol/geom";
import icon from "../../../assets/placeholder.png";

class StyleControl {
  color = "#c10e0e";
  style!: Style[];
  lineDash?: number[];

  additionalStyle = new Style({
    image: new Icon({
      src: icon,
      scale: 0.033,
      anchor: [0.5, 1],
    }),
    geometry(feature) {
      if (feature) {
        const geometry = feature.getGeometry();
        if (geometry instanceof Polygon) {
          const coordinates = geometry.getCoordinates()[0];
          return new MultiPoint(coordinates);
        } else if (geometry instanceof LineString) {
          const coordinates = geometry.getCoordinates();
          return new MultiPoint(coordinates);
        }
      }
    },
  });

  constructor(color?: string, lineDash?: number[]) {
    if (color) this.color = color;
    if (lineDash) this.lineDash = lineDash;
    this.updateStyle();
  }

  addStyle() {
    this.style.push(this.additionalStyle);
  }

  updateStyle() {
    this.style = [
      new Style({
        fill: new Fill({
          color: this.color + "22",
        }),
        stroke: new Stroke({
          width: 2,
          lineDash: this.lineDash,
          color: this.color,
        }),
        image: new Circle({
          radius: 5,
          fill: new Fill({
            color: this.color,
          }),
        }),
      }),
    ];
  }

  // обновляю стиль
  setColor(color: string) {
    this.color = color;
    this.updateStyle();
    return this;
  }
}

export default StyleControl;
