import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import notificacionesSlice from "./notificacionesSlice";

const store = configureStore({
  reducer: { user: userSlice, notif: notificacionesSlice },
});

export default store;
