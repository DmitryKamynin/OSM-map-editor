import { Draw } from "ol/interaction";
import StyleControl from "../../../../colorPicker/model";
import vectorSource from "../../vectorSource/model";
import featureInit from "../../../../utils/featureInit";

const createDraw = (type: "LineString" | "Polygon", freehand?: boolean) => {
  const drawStyle = new StyleControl();
  drawStyle.addStyle();
  const draw = new Draw({
    type,
    freehand,
    source: vectorSource,
    condition: (e) => {
      if (e.originalEvent instanceof PointerEvent) {
        return e.originalEvent.buttons === 1;
      }
      return false;
    },
    style: drawStyle.style,
  });

  draw.on("drawend", ({ feature }) => {
    featureInit(feature);
  });

  return draw;
};

export default createDraw;
