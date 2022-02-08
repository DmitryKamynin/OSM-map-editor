import { observer } from "mobx-react-lite";
import Style from "./style";
import { useCallback, useEffect, useRef, useState } from "preact/compat";

import menuList from "../model";
import ToolsStore from "../../tools/viewModel";

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

  const click = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      window.addEventListener("contextmenu", contextmenu);
      window.addEventListener("click", click);
      return () => {
        window.removeEventListener("contextmenu", contextmenu);
        window.removeEventListener("click", click);
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
