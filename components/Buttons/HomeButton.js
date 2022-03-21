import LoadingButton from '@mui/lab/LoadingButton';
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

function HomeButton({ text, handleClick, force }) {
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

  const [loading, setLoading] = useState(false);

    return (
      <ThemeProvider theme={theme}>
        <LoadingButton className="btn" loading={force ? force : loading} onClick={() => {setLoading(true); handleClick()}} 
        loadingIndicator={<CircularProgress color='primary' size={16}></CircularProgress>}
         sx={{
            borderRadius: '60px',
            height: '39px',
            fontSize: '14px',
            fontWeight: 'bold',
            minWidth: '305px',
            textTransform: 'inherit',
            background: '#c35c6c',
            padding: 0,
            color: '#fff',
            transition: 'all 0.4s',
            ':hover': {
              background: '#fff',
              color: '#c35c6c',
            }
          }}>{text}</LoadingButton>
      </ThemeProvider>
    );
};

export default HomeButton;