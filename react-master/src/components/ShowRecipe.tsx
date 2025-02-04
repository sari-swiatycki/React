import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootStore } from "../ReduxStore";
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Recipe } from "./RecipesStore";
const ShowRecipe = () => {
    const { id } = useParams();
    const recipes = useSelector((state: RootStore) => state.recipes.recipes);
    let recipe : Recipe | undefined;
    if(id)
       recipe = recipes.find(x => x.id === parseInt(id))
    return (
        <Box
            sx={{
                backgroundColor:"rgba(255,255,255,0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                marginTop: 10,
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    padding: 2,
                    width: "100%",
                    maxWidth: 600, 
                    paddingTop: "40px",
                         maxHeight: "70vh",
        overflowY: "auto",

                    backgroundColor: "#fff",
                    borderRadius: 2,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                {recipe ? (
                    <>
                        <Typography
                            variant="h5"
                            sx={{
                                marginBottom: 1,
                                color: "#333",
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            {recipe.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ marginBottom: 1,color: "#666", textAlign: "center", fontStyle: "italic",}}                             >
                            {recipe.description}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ marginTop: 2, fontWeight: "bold",    color: "#ff5722", }}       
                        >
                            Ingredients:
                        </Typography>
                        <List sx={{ paddingLeft: 0, marginBottom: 2 }}>
                            {recipe.ingredients.map((ingredient, index) => (
                                <ListItem key={index} sx={{ paddingLeft: 0 }}>
                                    <ListItemText
                                        primary={ingredient}
                                        sx={{  fontSize: "1rem",  color: "#444",}}                                    
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ marginY: 2 }} />
                        <Typography
                            variant="h6"
                            sx={{   marginTop: 2,   color: "#ff5722", fontWeight: "bold",   }}  
                        >
                            Instructions:
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ fontSize: "1rem",color: "#444", lineHeight: 1.4, }}  
                        >
                            {recipe.instructions}
                        </Typography>
                    </>
                ) : (
                    <Typography variant="h6" sx={{ color: "#888", textAlign: "center" }}>
                        Loading recipe...
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};
export default ShowRecipe;







