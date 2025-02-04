import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, array } from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../ReduxStore";
import { addRecipe, fetchRecipes, Recipe } from "./RecipesStore";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box, Typography } from "@mui/material";

const schema = object({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    ingredients: array().of(object({ name: string().required("Ingredient is required") })).min(1, "At least one ingredient is required"),
    instructions: string().required("Instructions are required"),
}).required();

export type RecipeType = { title: string; description: string; ingredients: { name: string }[]; instructions: string; };

const AddRecipeForm = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { control, formState: { errors }, register, handleSubmit, reset } = useForm<RecipeType>({ resolver: yupResolver(schema) });
    const { fields, append, remove } = useFieldArray({ control, name: "ingredients" });

    const onSubmit = async (data: RecipeType) => {
        const newRecipe: Recipe = { title: data.title, description: data.description, ingredients: data.ingredients.map(i => i.name), instructions: data.instructions };
        await dispatch(addRecipe(newRecipe)); 
        dispatch(fetchRecipes());
        reset();
        onClose(); 
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ backgroundColor: "#f5f5f5", color: "#333" }}>Add a New Recipe</DialogTitle>
            <DialogContent sx={{ backgroundColor: "#fafafa" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ color: "#333" }}>Title</Typography>
                        <TextField label="Recipe Title" {...register("title")} fullWidth margin="normal" variant="outlined" error={!!errors.title} helperText={errors.title?.message} sx={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e0e0e0" }} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ color: "#333" }}>Description</Typography>
                        <TextField label="Recipe Description" {...register("description")} fullWidth margin="normal" variant="outlined" error={!!errors.description} helperText={errors.description?.message} sx={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e0e0e0" }} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ color: "#333" }}>Ingredients</Typography>
                        {fields.map((item, index) => (
                            <Box key={item.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <TextField label={`Ingredient #${index + 1}`} {...register(`ingredients.${index}.name` as const)} fullWidth margin="normal" variant="outlined" error={!!errors.ingredients?.[index]?.name} helperText={errors.ingredients?.[index]?.name?.message} sx={{ backgroundColor: "#fff", borderRadius: "8px", mr: 1, border: "1px solid #e0e0e0" }} />
                                <Button type="button" onClick={() => remove(index)} variant="outlined" color="secondary" sx={{ borderRadius: "8px", border: "1px solid #e0e0e0" }}>Remove</Button>
                            </Box>
                        ))}
                        <Button type="button" onClick={() => append({ name: "" })} variant="contained" sx={{ mt: 1, backgroundColor: "#cccccc", color: "#333", borderRadius: "8px", "&:hover": { backgroundColor: "#b3b3b3" } }}>Add Ingredient</Button>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ color: "#333" }}>Instructions</Typography>
                        <TextField label="Instructions" {...register("instructions")} fullWidth variant="outlined" multiline margin="normal" rows={4} error={!!errors.instructions} helperText={errors.instructions?.message} sx={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e0e0e0" }} />
                    </Box>
                </form>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#f5f5f5" }}>
                <Button onClick={onClose} color="secondary" variant="outlined" sx={{ borderRadius: "8px", border: "1px solid #e0e0e0" }}>Cancel</Button>
                <Button type="submit" onClick={handleSubmit(onSubmit)} color="primary" variant="contained" sx={{ borderRadius: "8px", backgroundColor: "#333", color: "#fff", "&:hover": { backgroundColor: "#222" } }}>Add Recipe</Button>
            </DialogActions>
        </Dialog>
    );
};
export default AddRecipeForm;
