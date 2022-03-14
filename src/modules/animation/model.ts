import { types } from "mobx-state-tree";

const roadModel = types.model({
  coord: types.array(types.number),
  speed: types.number,
});

const MowerModel = types.model({
  road: types.array(types.array(types.number)),
  name: types.string,
  runSpeed: types.number,
  runAnimation: types.boolean,
  autoPause: types.boolean,
});

export default MowerModel;
