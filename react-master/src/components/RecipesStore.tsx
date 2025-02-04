
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStore } from '../ReduxStore';
export type Recipe = {
    id?: number
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
};
export const fetchRecipes = createAsyncThunk(
    'recipes/fetch',
    async (_, thunkApi) => {
        try {
            const res = await axios.get("http://localhost:3000/api/recipes");
            return res.data as Recipe[];
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkApi.rejectWithValue(error.message);
            }
            return thunkApi.rejectWithValue("Unknown error occurred");
        }
    }
);

export const addRecipe = createAsyncThunk('recipes/add', async (recipe: Recipe, thunkApi) => {
    try {
        const res = await axios.post("http://localhost:3000/api/recipes",
            recipe,
            {
                headers: { 'user-id': 1 }
            });
       
        return res.data as Recipe[];
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});
const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [] as Recipe[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to load recipes";
            })
            .addCase(addRecipe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRecipe.fulfilled, (state, action: PayloadAction<Recipe>) => {
                state.loading = false;
                state.recipes.push(action.payload);
            })
            .addCase(addRecipe.rejected, (state, action) => {
                console.log("cvgh");

                state.loading = false;
                state.error = action.payload as string || "Failed to add recipe";
            });
    }
});
export const selectRecipes = (state: RootStore) => state.recipes;
export default recipesSlice;