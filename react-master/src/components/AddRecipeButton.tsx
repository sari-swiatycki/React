import React, { useContext, useState } from "react";
import { CurrentContext } from "./User";
import { Button } from "@mui/material";
import AddRecipeForm from "./AddRecipes";

export default () => {
    const context = useContext(CurrentContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            {context?.currentUser.firstName && (
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleOpen}
                    sx={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        zIndex: 1000,
                        backgroundColor: "#424242", 
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "#616161", 
                        },
                    }}
                >
                    Add Recipe
                </Button>
            )}
            {open && <AddRecipeForm open={open} onClose={handleClose} />}
        </div>
    );
};
