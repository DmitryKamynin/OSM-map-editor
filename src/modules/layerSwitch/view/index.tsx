import Style from "./style";
import layerIcon from "../../../assets/98870.png";
import { map } from "../../map/view";
import { useState } from "preact/compat";

const LayerSwitch = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const layers = map.getLayers().getArray().slice(1);
  return (
    <Style>
      <button
        type="button"
        className="icon"
        onClick={(): void => setOpen(!open)}
      >
        <img src={layerIcon} alt="" />{" "}
      </button>
      <div className={open ? "menu open" : "menu"}>
        {layers.map((layer) => (
          <>
            {layer.get("type") !== "checkbox" ? (
              <button
                onClick={() => {
                  layers.forEach((lay) => {
                    if (lay.get("type") !== "checkbox") lay.setZIndex(0);
                  });
                  layer.setZIndex(2);
                }}
                type="button"
                className="layerBtn"
              >
                {layer.get("name")}
              </button>
            ) : (
              <label className="layerBtn checkbox">
                {layer.get("name")}
                <input
                  type="checkbox"
                  onChange={() => {
                    const zIndex = layer.getZIndex();
                    if (zIndex) layer.setZIndex(0);
                    else layer.setZIndex(3);
                  }}
                  checked={!!layer.getZIndex()}
                />
              </label>
            )}
          </>
        ))}
      </div>
    </Style>
  );
};

export default LayerSwitch;
