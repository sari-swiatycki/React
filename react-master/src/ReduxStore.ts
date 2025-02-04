


import { configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./components/RecipesStore";

const store = configureStore({
    reducer: {
        recipes: recipesSlice.reducer, // חיבור ה-reducer בצורה נכונה
    }
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;





