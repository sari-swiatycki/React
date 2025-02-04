import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button, Box } from "@mui/material";
import Login from "./LogIn";
import LogUp from "./LogUp";
import Update from "./UpDate";
import LetterAvatars from "./Avatar";
const Home = () => {
    const [IsOpen, setIsOpen] = useState(false);
    const handleSubmit = () => setIsOpen(true);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Box sx={{ flexGrow: 1 }}>
                <Outlet />
                {!IsOpen && <Login IsOpen={handleSubmit} />}
                {!IsOpen && <LogUp IsOpen={handleSubmit} />}
                {IsOpen && <Update />}
                {IsOpen && <LetterAvatars />}
            </Box>

            <Button
                onClick={() => { window.location.href = "/" }}
                variant="contained"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#424242",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#616161" },
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
            >
                Sign Out
            </Button>
        </Box>
    );
};

export default Home;
