import { ToolsModelType } from "../../tools/model";
import { map } from "../../map/view";
import { Draw } from "ol/interaction";
import FeatureManager from "../../featureManager/viewModel";
import vectorSource from "../../map/modules/vectorSource/model";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import ColorPickerStore from "../../colorPicker/viewModel";

type Keys = ToolsModelType["currentTool"];

type MenuListElem = {
  title: string;
  action?: () => void;
};

type MenuList = Record<Keys, MenuListElem[]>;

const drawMenus = (): MenuListElem[] => [
  {
    title: "Закончить рисовать",
    action() {
      const interaction = map.getInteractions().getArray();
      (interaction[interaction.length - 1] as Draw).finishDrawing();
    },
  },
  {
    title: "Рисовать сначала",
    action() {
      const interaction = map.getInteractions().getArray();
      (interaction[interaction.length - 1] as Draw).abortDrawing();
    },
  },
];

const menuLists = (): MenuList => {
  const draws = drawMenus();
  const feature = FeatureManager.currentFeature as unknown as Feature<Geometry>;
  const featureProps = feature?.getProperties();

  return {
    line: draws,
    pen: draws,
    polygon: draws,
    choice: feature
      ? [
          !featureProps.saved
            ? {
                title: "Сохранить объект",
                action() {
                  FeatureManager.saveToLocalStorage(feature);
                },
              }
            : {
                title: "Не сохранять объект",
                action() {
                  FeatureManager.removeFromLocalStorage(feature);
                },
              },
          {
            title: "Удалить объект",
            action() {
              FeatureManager.removeFromLocalStorage(feature);
              vectorSource.removeFeature(feature);
              FeatureManager.clearCurrentFeature();
            },
          },
          {
            title: "Выбрать новый цвет",
            action() {
              ColorPickerStore.handleOpen(true);
            },
          },
        ]
      : [{ title: "Сначала выберите объект" }],
    none: [
      {
        title:
          "Контекстное меню доступно для Карандаша, Полигона, Маршрута и Выбора",
      },
    ],
    edit: [
      {
        title:
          "Контекстное меню доступно для Карандаша, Полигона, Маршрута и Выбора",
      },
    ],
  };
};

export default menuLists;
