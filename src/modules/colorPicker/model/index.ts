import { Fill, Stroke, Style, Circle } from "ol/style";

class StyleControl {
  color = "#c10e0e";
  style!: Style;

  constructor(color?: string) {
    if (color) this.color = color;
    this.#updateStyle();
  }

  #updateStyle() {
    this.style = new Style({
      fill: new Fill({
        color: this.color + "22",
      }),
      stroke: new Stroke({
        width: 2,
        color: this.color,
      }),
      image: new Circle({
        radius: 5,
        fill: new Fill({
          color: this.color,
        }),
      }),
    });
  }

  // обновляю стиль
  setColor(color: string) {
    this.color = color;
    this.#updateStyle();
    return this;
  }
}

export default StyleControl;
