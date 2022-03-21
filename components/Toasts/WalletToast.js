import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

export default function WalletToast({ init }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={init ? init : open} autoHideDuration={null} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right'}}>
      <Alert action={
        <Button sx={{
          ':hover': {
            color: '#FA8072'
          }
        }}
        onClick={() => setOpen(false)} 
        variant={'text'} 
        href='https://docs.eternal.money/users-guide-to-eternal/how-to/get-started' 
        color="warning" 
        size="small">
          Help me with this
        </Button>
      } onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        This app requires a valid wallet. Please install MetaMask or another wallet supported by this website
      </Alert>
    </Snackbar>
  );
}