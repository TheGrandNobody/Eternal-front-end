import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ExitGage( {handleExitGage, exitable} ) {

  const [open, setOpen] = React.useState(false);

  const handleExit = () => {
    if (exitable) {
      handleExitGage();
    } else {
      setOpen(true);
    }
  };

  const handleClose = (exit = false) => {
    if (exit) {
      handleExitGage();
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={() => handleExit()} className='btn grid-btn mx-sm-2 mx-1'>
        Exit Gage
      </button>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: { borderRadius: 12, backgroundColor: '#26062f', maxWidth: '325px' }
        }}
      >
        <DialogTitle className='text-center' sx={{ color: '#ffff', fontSize: 'large' }} id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#eae6eb', fontSize: 'small', fontWeight: '500'}} align='center' id="alert-dialog-description">
            Exiting a gage when its condition is not yet fulfilled will close it in favor of the other party. This would result in a net loss for you.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='d-flex justify-content-around'>
          <Button sx={{
            color: '#bbabe3',
            borderRadius: 1,
            ':hover': {
              bgcolor: '#eae6eb10'
          } }} onClick={() => handleClose(true)}>Exit Anyways</Button>
          <Button sx={{
            color: '#bbabe3', 
            borderRadius: 1,
            ':hover': {
              bgcolor: '#eae6eb10'
          } }} onClick={() => handleClose()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ExitGage;