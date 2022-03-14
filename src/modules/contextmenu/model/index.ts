import { ToolsModelType } from "../../tools/model";
import { map } from "../../map/view";
import { Draw } from "ol/interaction";
import FeatureManager from "../../featureManager/viewModel";
import vectorSource from "../../map/modules/vectorSource/model";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import ColorPickerStore from "../../colorPicker/viewModel";
import createOverlay from "../../utils/createOverlay";
import deleteOverlay from "../../utils/deleteOverlay";

type Keys = ToolsModelType["currentTool"];

type MenuListElem = {
  title: string;
  action?: () => void;
};

type MenuList = Record<Keys, MenuListElem[]>;

const drawMenus = (): MenuListElem[] => [
  {
    title: "Finish drawing",
    action() {
      const interaction = map.getInteractions().getArray();
      (interaction[interaction.length - 1] as Draw).finishDrawing();
    },
  },
  {
    title: "Draw again",
    action() {
      const interaction = map.getInteractions().getArray();
      (interaction[interaction.length - 1] as Draw).abortDrawing();
    },
  },
];

const menuLists = (): MenuList => {
  const draws = drawMenus();
  const feature = FeatureManager.currentFeature as unknown as Feature<Geometry>;
  const type = FeatureManager.currentFeature?.getGeometry()?.getType();

  const none = [
    {
      title: "Delete",
      action() {
        vectorSource.removeFeature(feature);
        deleteOverlay(feature);
        FeatureManager.clearCurrentFeature();
      },
    },
    {
      title: "Change color",
      action() {
        ColorPickerStore.handleOpen(true);
      },
    },
  ];
  return {
    line: draws,
    polygon: draws,
    none: feature ? none : [{ title: "First choice object" }],
  };
};

export default menuLists;
