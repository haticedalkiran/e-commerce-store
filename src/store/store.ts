import { configureStore } from "@reduxjs/toolkit";
import { RecordsState } from "./records.state";

export const store = configureStore({
  reducer: {
    //filter: FilterState.reducer,
    records: RecordsState.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
