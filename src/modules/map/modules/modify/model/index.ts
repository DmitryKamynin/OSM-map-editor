import { Modify } from "ol/interaction";
import vectorSource from "../../vectorSource/model";
import { Icon, Style } from "ol/style";
import plusIcon from "../../../../../assets/plus.png";

const style = new Style({
  image: new Icon({
    src: plusIcon,
    scale: 0.1,
  }),
});

const modify = new Modify({
  source: vectorSource,
  style,
});

export default modify;
