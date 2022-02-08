import { types } from "mobx-state-tree";

const ColorPickerStore = types
  .model({
    open: types.boolean,
  })
  .actions((self) => ({
    handleOpen(open?: boolean) {
      self.open = open ?? !self.open;
    },
  }))
  .create({ open: false });

export default ColorPickerStore;
