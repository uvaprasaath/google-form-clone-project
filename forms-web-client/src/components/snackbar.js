import React, { useState } from 'react';
import { Snackbar, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const SnackbarComponent = ({ open, message, onClose }) => {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Snackbar
    anchorOrigin={{ vertical:"top", horizontal:"right" }}
      open={open}
      autoHideDuration={1300} 
      onClose={handleClose}
      message={message}
      action={
        <IconButton size="small" color="inherit" onClick={onClose}>
          <Close fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default SnackbarComponent;
