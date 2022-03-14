import { observer } from "mobx-react-lite";
import Style from "./style";
import { useCallback, useEffect, useRef, useState } from "preact/compat";

import menuList from "../model";
import ToolsStore from "../../tools/viewModel";
import { map } from "../../map/view";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import FeatureManager from "../../featureManager/viewModel";

const ContextMenu = observer((): JSX.Element => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const contextmenu = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const menuElem = menuRef.current as HTMLDivElement;
      menuElem.style.top = `${e.clientY}px`;
      menuElem.style.left = `${e.clientX}px`;
      setOpen(!open);
    },
    [open]
  );

  const mapClick = useCallback(
    (e: any) => {
      if (ToolsStore.currentTool === "none") {
        const features = map.getFeaturesAtPixel(e.pixel) as [Feature<Geometry>];
        FeatureManager.setCurrentFeature(features[0]);
        if (features[0]) {
          const menuElem = menuRef.current as HTMLDivElement;
          menuElem.style.top = `${e.originalEvent.clientY}px`;
          menuElem.style.left = `${e.originalEvent.clientX}px`;
          setOpen(true);
        } else setOpen(false);
      } else setOpen(false);
    },
    [open]
  );

  useEffect(() => {
    if (menuRef.current) {
      window.addEventListener("contextmenu", contextmenu);
      map.on("click", mapClick);

      return () => {
        window.removeEventListener("contextmenu", contextmenu);
        map.un("click", mapClick);
      };
    }
  }, [menuRef.current, open]);

  const list = menuList();

  return (
    <Style className={open ? "open" : ""} ref={menuRef}>
      {list[ToolsStore.currentTool].map((menu) => (
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            if (menu.action) menu.action();
          }}
        >
          {menu.title}
        </button>
      ))}
    </Style>
  );
});

export default ContextMenu;
