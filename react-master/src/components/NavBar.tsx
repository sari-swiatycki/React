import { Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentContext } from "./User";

const NavBar = () => {
  console.log("gfdsa");
  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "100%",
        backgroundColor: "#212121", 
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", 
        p: 2,        
      }}
    >
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            backgroundColor: "#424242", 
            color: "#fff",
            "&:hover": { backgroundColor: "#616161" }, 
          }}
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/RecipesList"
          variant="contained"
          sx={{
            backgroundColor: "#424242",
            color: "#fff",
            "&:hover": { backgroundColor: "#616161" },
          }}
        >
          Recipes
        </Button>
      </Stack>
    </Box>
  );
};

export default NavBar;
















