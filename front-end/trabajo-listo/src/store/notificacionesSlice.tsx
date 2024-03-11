import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  hidden: true,
  message: "",
};

const notificacionesSlice = createSlice({
  name: "notificacion",
  initialState,
  reducers: {
    SUCCES(state, action) {
      toast.success(action.payload.message);
      state.hidden = false;
    },
    ERROR(state, action) {
      toast.error(action.payload.message);
      state.hidden = false;
    },
    NORMAL(state, action) {
      toast.info(action.payload.message);
      state.hidden = false;
    },
    ADVERTENCIA(state, action) {
      toast.warning(action.payload.message);
      state.hidden = false;
    },
  },
});
export const notificacionesActions = notificacionesSlice.actions;

export default notificacionesSlice.reducer;
