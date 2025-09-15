import { Box, Modal } from '@mui/material';
import React from 'react';
import RegisterForm from './RegisterForm';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  outline: "none",
  boxShadow: 34,
  p: 4,
  borderRadius: 1, // This adds the rounded corners
};

const AuthModal = ({ handleClose, open }) => {
  const location=useLocation();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

        {location.pathname==="/login"?<LoginForm/>:<RegisterForm />}
      </Box>
    </Modal>
  );
}

export default AuthModal;
