import { useContext, useRef, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";
import axios from "axios";
import { CurrentContext } from "./User";
const style = {  position: 'absolute', top: '50%',  left: '50%',  transform: 'translate(-50%, -50%)',  width: 400,  border: '2px solid #000',  bgcolor: 'background.paper',  boxShadow: 24,  p: 4,};
const Update = () => {
  const [isClicked, setIsClicked] = useState(false);
  const context = useContext(CurrentContext);
  const lNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:3000/api/user', {
        firstName: context?.currentUser.firstName,
        lastName: lNameRef.current?.value,
        email: emailRef.current?.value,
        address: addressRef.current?.value,
        phone: phoneRef.current?.value,
      }, {
        headers: {
          'user-id': context?.currentUser.id, 
        }
      });
      setUser(res.data.user);
      context?.dispatch({ 
        type: 'UPDATE', 
        new_data: { 
          id: context.currentUser.id,
          firstName: context.currentUser.firstName, 
          lastName: lNameRef.current?.value || '', 
          passward: context.currentUser.passward,
          email: emailRef.current?.value || '', 
          address: addressRef.current?.value || '', 
          phone: phoneRef.current?.value || '' 
        } 
      });
      setIsClicked(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <>
      <Box
        position="absolute"
        top={16} 
        left={80} 
        sx={{ padding: '16px' }}
      >
        <Button
          onClick={() => setIsClicked(true)}
          sx={{
            backgroundColor: '#212121', 
            color: 'white', 
            border: '2px solid white', 
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: '#424242', 
            },
          }}
        >
          Update Details
        </Button>
      </Box>
      <Modal
        open={isClicked}
        onClose={() => setIsClicked(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField type="text" inputRef={lNameRef} placeholder="Last Name" fullWidth margin="normal" />
          <TextField type="text" inputRef={addressRef} placeholder="Address" fullWidth margin="normal" />
          <TextField type="text" inputRef={emailRef} placeholder="Email" fullWidth margin="normal" />
          <TextField type="text" inputRef={phoneRef} placeholder="Phone" fullWidth margin="normal" />
          <Button onClick={handleSubmit} fullWidth sx={{ marginTop: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};
export default Update;
