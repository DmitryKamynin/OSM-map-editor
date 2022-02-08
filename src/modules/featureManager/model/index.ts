import { types } from "mobx-state-tree";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import { Style } from "ol/style";

const FeatureManagerModel = types
  .model({})
  .volatile(
    (): {
      currentStyle?: Style | Style[];
      currentFeature?: Feature<Geometry>;
    } => ({
      currentStyle: undefined,
      currentFeature: undefined,
    })
  )
  .views(() => ({
    get storage(): any[] {
      const items = localStorage.getItem("features");
      return items ? JSON.parse(items) : [];
    },
  }));

export default FeatureManagerModel;
