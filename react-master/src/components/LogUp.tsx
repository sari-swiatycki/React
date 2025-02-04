import { Box, Button, Modal, TextField } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import axios from "axios";
import { CurrentContext } from "./User";

const style = {  position: 'absolute',  top: '50%',  left: '50%',  transform: 'translate(-50%, -50%)',  width: 400,  bgcolor: '#212121',   border: '2px solid #424242',   p: 4,};
const LogUp = ({ IsOpen }: { IsOpen: Function }) => {
  const [isClicked, setIsClicked] = useState(false);
  const context = useContext(CurrentContext);
  const fNameRef = useRef<HTMLInputElement>(null);
  const passwardREf = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState({});
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/user/register', {
        firstName: fNameRef.current?.value,
        password: passwardREf.current?.value,
      });
      setUser(res.data.user);
      IsOpen();
      context?.dispatch({
        type: 'CREATE',
        new_data: {
          id: res.data.userId,
          firstName: fNameRef.current?.value || '',
          lastName: '',
          passward: passwardREf.current?.value || '',
          email: '',
          address: '',
          phone: ''
        }
      });
    } catch (e:any) {
      if(e.status==400)
        alert("user name already exist");
      setIsClicked(false);
    }
  };
  return (
    <>
      <Button
        style={{position: 'absolute',top: 10, left: 100, backgroundColor: "#424242",  color: "#fff",  }}  
        onClick={() => setIsClicked(true)}
      >
        Register
      </Button>
      <Modal
        open={isClicked}
        onClose={() => setIsClicked(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            type="text"
            inputRef={fNameRef}
            placeholder="First Name"
            sx={{
              backgroundColor: "#424242",
              color: "#fff",
              marginBottom: 2,
              "& .MuiInputBase-root": {
                color: "#fff",
              },
              "& .MuiInputBase-input": {
                color: "#fff", },  }}          
          />
          <TextField
            type="password"
            inputRef={passwardREf}
            placeholder="Password"
            sx={{     backgroundColor: "#424242", color: "#fff",     "& .MuiInputBase-root": { color: "#fff",   },
              marginBottom: 2,
              "& .MuiInputBase-input": {
                color: "#fff", },    }}              
          />
          <Button
            onClick={handleSubmit}
            sx={{     backgroundColor: "#424242",      color: "#fff","&:hover": {backgroundColor: "#616161",  },  }}        
          >
            CREATE
          </Button>
        </Box>
      </Modal>
    </>
  );
};
export default LogUp;
