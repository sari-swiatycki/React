import { FormEvent, useContext, useRef, useState } from "react";
import axios from "axios";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { CurrentContext } from "./User";
const style = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "#212121", border: "2px solid #424242", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", p: 4 };

const Login = ({ IsOpen }: { IsOpen: Function }) => {
  const [isClicked, setIsClicked] = useState(false);
  const context = useContext(CurrentContext);
  const fNameRef = useRef<HTMLInputElement>(null);
  const passwardREf = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", { firstName: fNameRef.current?.value, password: passwardREf.current?.value });
      context?.dispatch({ type: "CREATE", new_data: { id: res.data.user.id, firstName: fNameRef.current?.value || "", lastName: "", passward: passwardREf.current?.value || "", email: "", address: "", phone: "" } });
      setIsClicked(false); 
      IsOpen();
    } catch (e) {
      if (e.status === 401) alert("Email or password isn't valid");
      setIsClicked(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsClicked(true)} sx={{ position: "absolute", top: 10, left: 10, backgroundColor: "#424242", color: "#fff", "&:hover": { backgroundColor: "#616161" } }} variant="contained">
        Login
      </Button>

      <Modal open={isClicked} onClose={() => setIsClicked(false)}>
        <Box sx={style}>
          <Typography variant="h6" color="white">Login to Your Account</Typography>
          <TextField type="text" inputRef={fNameRef} placeholder="First Name" sx={{ backgroundColor: "#424242", color: "#fff", mb: 2, "& .MuiInputBase-root": { color: "#fff" } }} fullWidth />
          <TextField type="password" inputRef={passwardREf} placeholder="Password" sx={{ backgroundColor: "#424242", color: "#fff", mb: 2, "& .MuiInputBase-root": { color: "#fff" } }} fullWidth />
          <Button onClick={handleSubmit} sx={{ backgroundColor: "#424242", color: "#fff", "&:hover": { backgroundColor: "#616161" } }} variant="contained" fullWidth>Log-In</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Login;

