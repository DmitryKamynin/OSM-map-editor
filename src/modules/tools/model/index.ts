import { types, Instance } from "mobx-state-tree";
import { Interaction } from "ol/interaction";

const ToolsModel = types
  .model({
    currentTool: types.enumeration(["line", "polygon", "none"]),
  })
  .volatile((): { lastDraw?: Interaction } => ({
    lastDraw: undefined,
  }));

export type ToolsModelType = Instance<typeof ToolsModel>;

export default ToolsModel;
