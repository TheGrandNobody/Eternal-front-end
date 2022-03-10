import LoadingButton from '@mui/lab/LoadingButton'
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
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

function ConfirmButton({ handleClick, refresh, success, message, delay, disabled, text }) {

  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true)
    const result = await handleClick();
    setLoading(delay);
    if (typeof result == 'object') {
      let interval = setInterval(async () => {
        let receipt = await getWeb3NoAccount().eth.getTransactionReceipt(result.hash);
        if (receipt) {
          setLoading(false);
          success();
          if (message != '') {
            toast.success(message, { toastId: 1 });
          }
          clearInterval(interval);
          refresh();
        }
      }, 500);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <LoadingButton disabled={disabled} loading={loading} onClick={onClick} loadingIndicator={<CircularProgress color='primary' size={16}></CircularProgress>} sx={{ 
            borderRadius: '60px',
            height: '39px',
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'inherit',
            background: '#c35c6c',
            width: '200px',
            padding: 0,
            ':hover':{
              bgcolor: '#fff',
              color: '#c35c6c',
            },
            ':disabled':{
              color: '#fff',
            },
            }} className='btn' >{loading ? '' : text}</LoadingButton>
    </ThemeProvider>
  );
}

export default ConfirmButton;