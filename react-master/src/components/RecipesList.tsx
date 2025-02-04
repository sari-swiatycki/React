import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react";
import { addRecipe, fetchRecipes, Recipe } from "./RecipesStore";
import AddRecipeButton from "./AddRecipeButton";
import { Link } from "react-router-dom";
import { Avatar, Grid, List, ListItem, Typography, Box } from "@mui/material";
import { AppDispatch, RootStore } from "../ReduxStore";
import { CurrentContext } from "./User";

export default () => {
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state: RootStore) => state.recipes.recipes);
    
    useEffect(() => {
        console.log("Fetching recipes...");
        dispatch(fetchRecipes());
    }, [dispatch]);

    const context = useContext(CurrentContext);

    return (
        <>
            <Box 
                sx={{
                    backgroundColor: "rgba(33, 33, 33, 0.9)", 
                    padding: "20px",
                    borderRadius: "12px",
                    maxWidth: "900px", 
                    margin: "auto", 
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: '"Dancing Script", cursive', 
                        fontWeight: 700,
                        color: "#fff", 
                        textAlign: "center",
                        marginBottom: "20px",
                    }}
                >
                   Recipe List
                </Typography>

                <List>
                    {recipes.map((recipe: Recipe) => (
                        <ListItem key={recipe.id} sx={{ marginBottom: "15px" }}>
                            <Link
                                to={`Recipe/${recipe.id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    src={`/images/${(recipe.title || "default").replace(/\s+/g, '')}.jpg`}
                                    alt={recipe.title}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        marginRight: 2,
                                        borderRadius: 0,
                                    }}
                                    onError={() => console.log(`Image not found: /images/${recipe.title.replace(/\s+/g, '')}.jpg`)}
                                />
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontFamily: '"Arial", sans-serif',
                                        fontSize: "1.1rem",
                                        color: "#f5f5f5", 
                                        lineHeight: "1.6",
                                    }}
                                >
                                    {recipe.title}
                                </Typography>
                            </Link>
                        </ListItem>
                    ))}
                </List>

                {context?.currentUser.id && <AddRecipeButton />}
            </Box>
        </>
    );
};









