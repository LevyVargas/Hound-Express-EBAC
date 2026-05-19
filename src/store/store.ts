import { configureStore } from "@reduxjs/toolkit";
import guidesReducer from "./guidesSlice";

export const store = configureStore({
    reducer: {
        guides: guidesReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("guias", JSON.stringify(state.guides.guides));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
