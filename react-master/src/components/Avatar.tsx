import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';
import { useContext } from 'react';
import { Box } from '@mui/material';
import { CurrentContext } from './User';

const LetterAvatars = () => {
  const context = useContext(CurrentContext);
  let f: string = '';
  if (context) {
    f = context.currentUser.firstName[0];
    if (context.currentUser.lastName) f += context.currentUser.lastName[0];
  }
  return (
    <Stack direction="row" spacing={2}>
      <Box
        position="absolute"
        top={16}  
        left={16}  
        sx={{ padding: '16px' }}
      >
        <Avatar
          sx={{
            bgcolor: grey[900], 
            width: 50, 
            height: 50, 
            fontSize: '2rem', 
            border: '2px solid white', 
            boxShadow: 2, 
          }}
        >
          {f}
        </Avatar>
      </Box>
    </Stack>
  );
};

export default LetterAvatars;
