import MowerModel from "./model";
import turfTransform from "../roadGenerator/viewmodel/turfTransform";
import length from "@turf/length";
import along from "@turf/along";
import vectorSource from "../map/modules/vectorSource/model";
import { LineString, Point } from "ol/geom";
import { Icon, Style } from "ol/style";
import { Feature } from "ol";
import { applySnapshot } from "mobx-state-tree";

// const defaultState = {
//   runSpeed: 1,
//   road: [
//     [-1028025.6492116194, 4780807.619341033],
//     [-1028022.663390202, 4780808.15678809],
//     [-1028021.9766503648, 4780808.604661303],
//     [-1028021.618352706, 4780809.112252311],
//     [-1028021.1406217348, 4780811.053036232],
//     [-1028020.9017551101, 4780814.128432064],
//     [-1028020.6237540727, 4780818.407474447],
//     [-1028019.3469263726, 4780823.089187514],
//     [-1028017.3252757493, 4780826.7068747915],
//     [-1028017.3784762269, 4780828.0901095355],
//     [-1028018.176495569, 4780829.207335803],
//     [-1028019.3469263726, 4780829.845751682],
//     [-1028021.1557669673, 4780830.696972516],
//     [-1028023.2306180684, 4780832.559017648],
//     [-1028023.6562300076, 4780833.88904887],
//     [-1028023.6030295299, 4780835.857496986],
//     [-1028023.3370190231, 4780838.304757012],
//     [-1028022.6986051732, 4780840.6988150375],
//     [-1028021.7409803392, 4780844.422905301],
//     [-1028021.2089674445, 4780847.827786609],
//     [-1028021.2089674445, 4780849.317422308],
//     [-1028021.2621719812, 4780850.541052574],
//     [-1028021.7941848758, 4780852.083890781],
//     [-1028022.1133918008, 4780854.052337882],
//     [-1028022.1133918008, 4780855.807981043],
//     [-1028022.2197927561, 4780857.829629637],
//     [-1028022.0601913227, 4780860.675897811],
//     [-1028021.4749779503, 4780863.708371716],
//     [-1028020.570553594, 4780866.368436189],
//     [-1028019.8789392663, 4780868.496488783],
//     [-1028019.2405213574, 4780870.571338869],
//     [-1028018.7085084626, 4780872.060974568],
//     [-1028017.9636895984, 4780873.816617729],
//     [-1028017.1124697786, 4780877.540707485],
//     [-1028016.4208554503, 4780881.317998224],
//     [-1028015.7824416003, 4780885.4677004265],
//     [-1028014.878017244, 4780888.234164841],
//     [-1028014.1864029163, 4780890.5218219105],
//     [-1028013.8139914547, 4780893.660698801],
//     [-1028013.795484244, 4780896.991612807],
//     [-1028013.635882811, 4780900.130487667],
//     [-1028013.2102708716, 4780902.577748201],
//     [-1028011.7206372019, 4780905.237812674],
//     [-1028010.2309994734, 4780906.408240434],
//     [-1028008.20934885, 4780906.355038941],
//     [-1028007.1453230607, 4780905.663422584],
//   ],
//   name: "Косилка",
//   runAnimation: false,
//   autoPause: false,
// };
//
// const style = new Style({
//   image: new Icon({
//     src: "https://www.pinclipart.com/picdir/big/1-13718_lawn-mowers-computer-icons-honda-lawn-mower-clipart.png",
//     scale: 0.02,
//   }),
// });

// const store = MowerModel.actions((self) => {
//   let point = new Feature({ geometry: new Point(self.road[0]) });
//   point.setStyle(style);
//   vectorSource.addFeature(point);
//
//   let traveledLine = new Feature({
//     geometry: new LineString([self.road[0]]),
//   });
//   vectorSource.addFeature(traveledLine);
//   let isTrabeledLine = false;
//
//   return {
//     reset() {
//       applySnapshot(self, defaultState);
//       traveledLine.getGeometry()?.setCoordinates([self.road[0]]);
//       vectorSource.removeFeature(traveledLine);
//       isTrabeledLine = true;
//     },
//     setAutoPause(pause: boolean) {
//       self.autoPause = pause;
//     },
//     setRunSpeed(speed: number) {
//       self.runSpeed = speed;
//     },
//     setRoad(newPos: any) {
//       self.road.splice(0, 1, newPos);
//     },
//     shiftRoad() {
//       self.road.shift();
//     },
//     stopMove() {
//       self.runAnimation = false;
//     },
//     startMove() {
//       if (isTrabeledLine) {
//         vectorSource.addFeature(traveledLine);
//         isTrabeledLine = false;
//       }
//
//       let start = Date.now();
//       self.runAnimation = true;
//
//       const animation = () => {
//         const time = Date.now() - start;
//         vectorSource.removeFeature(point);
//
//         start = Date.now();
//         // @ts-ignore
//         const alongDistance = along(turfTransform(self.road), ((1 / 1000) * time * self.runSpeed) / 1000);
//
//         point = turfTransform(alongDistance);
//         vectorSource.addFeature(point);
//         point.setStyle(style);
//
//         const newPos = (point.getGeometry() as Point).getCoordinates();
//         this.setRoad(newPos);
//
//         traveledLine.getGeometry()?.setCoordinates([...traveledLine.getGeometry()?.getCoordinates()!, newPos]);
//
//         // @ts-ignore
//         const dist = length(turfTransform(self.road.slice(0, 2)));
//
//         if (dist < 0.0001) {
//           this.shiftRoad();
//         }
//
//         if (self.road.length && self.runAnimation) {
//           requestAnimationFrame(animation);
//         }
//       };
//       animation();
//     },
//   };
// }).create(defaultState);
//
// window.onblur = () => {
//   store.stopMove();
// };

export default {};
