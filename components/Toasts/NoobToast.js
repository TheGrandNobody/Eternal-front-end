import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

export default function NoobToast({ duration }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}>
      <Alert action={
        <Button variant={'text'} href='https://docs.eternal.money/' color="info" size="small">
          Bring me to the docs
        </Button>
      } onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        New to Eternal? Read the docs first!
      </Alert>
    </Snackbar>
  );
}