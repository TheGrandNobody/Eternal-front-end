import * as React from 'react';
import { CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { getWeb3NoAccount } from '../../utils/web3';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

function ExitGage( {handleExitGage, success, exitable} ) {

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleExit = async () => {
    setLoading(true);
    if (exitable) {
      const tx = await handleExitGage();
      handleResult(tx);
    } else {
      setOpen(true);
    }
  };

  const handleClose = async (exit = false) => {
    setOpen(false);
    if (exit) {
      const tx = await handleExitGage();
      handleResult(tx);
    }
  };

  const handleResult = async (tx) => {
    let interval = setInterval(async () => {
      let receipt = await getWeb3NoAccount().eth.getTransactionReceipt(tx.hash);
      if (receipt) {
        setLoading(false);
        success(receipt);
        toast.success('Gage successfully exited!')
        clearInterval(interval);
      }
    }, 1000);
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <LoadingButton onClick={handleExit} loading={loading} loadingIndicator={<CircularProgress color='primary' size={16}></CircularProgress>} sx={{ 
        borderRadius: '60px',
        height: '39px',
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'inherit',
        background: '#30083b',
        width: '134px',
        padding: 0,
        ':hover':{
          bgcolor: '#9c5cac',
          color: '#fff',
        },
        ':disabled':{
          color: '#fff',
        },
        }} className='btn mx-sm-2 mx-1' >{loading ? '' : 'Exit Gage'}
        </LoadingButton>
      </ThemeProvider>
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