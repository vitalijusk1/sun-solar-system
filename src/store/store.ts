import { configureStore } from "@reduxjs/toolkit";
import planetReducer from "./slices/planets/planetSlice";

export const store = configureStore({
  reducer: {
    planet: planetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
