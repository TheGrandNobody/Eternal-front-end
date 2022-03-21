
import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogContentText, Grid, IconButton, Paper, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowIcon from '@mui/icons-material/ArrowBack';
import ChangeIcon from '@mui/icons-material/SwitchAccount';
import OpenIcon from '@mui/icons-material/OpenInNew';
import CopyIcon from '@mui/icons-material/ContentCopy';
import PasteIcon from '@mui/icons-material/ContentPaste';
import Check from '@mui/icons-material/Check';
import useStore from '../../store/useStore';
import shallow from 'zustand/shallow';

const ids = [['MetaMask', 'MetaMask', 'metamask.svg', '35', '#f8de7e'], ['WalletLink', 'Coinbase Wallet', 'coinbase.png', '40','#0052ff'], ['WalletConnect', 'WalletConnect', 'walletconnect.svg', '25','#fff']];

function ConnectDialog({ onClose, handleBack, open, current, account }) {

  const handleClose = () => {
    onClose('');
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={() => handleClose()} PaperProps={{
      style: { 
        background: 'linear-gradient(165deg, #260530, 75%, #5b226c)',
        borderTop: '3px groove #e6e6fa',
        borderBottom: '3px ridge #e6e6fa'}}} open={open}>
      <DialogTitle className='text-center' sx={{ color: '#fff', background: 'transparent'}}>
        <IconButton onClick={() => handleClose()} style={{color: '#e6e6fa', position: 'absolute', top: '2px', right: '1px'}} 
        sx={{ ':hover': {
          bgcolor: '#ffffff10'
        }}}>
          <CloseIcon/>
        </IconButton>
        { account ? 
          <IconButton onClick={handleBack} style={{color: '#e6e6fa', position: 'absolute', top: '2px', left: '1px'}} 
          sx={{ ':hover': {
            bgcolor: '#ffffff10'
          }}}>
            <ArrowIcon/>
          </IconButton>
        : 
          null
        }
        <Typography paddingTop={'10%'} fontWeight={'bold'} fontSize={'24px'}>Choose your wallet</Typography>
      </DialogTitle>
      <List sx={{ pt: 0, pb: 3, background: 'transparent'}}>
        {ids.map((id) => (
          <ListItem 
          sx={{ ':hover': {
            bgcolor: '#00000030'
          }}}  
          button onClick={() => handleListItemClick(id[0])} key={id[0]}
          secondaryAction={current == id[0] ? <Check sx={{color: '#32CD32', position: 'relative', bottom: 4}}/> : null}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: `${id[4]}`}}>
                <img src={`./img/${id[2]}`} height={id[3]} width={id[3]}></img>
              </Avatar>
            </ListItemAvatar>
            <ListItemText disableTypography={true} sx={{color: '#fff', fontSize: 16}} primary={id[1]} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

function UserPanel({ onClose, setOpen, setVisible, open, current, visible, account, chainId }) {
  const [copy, setCopy] = React.useState('Copy');
  const names = { 
    'MetaMask' : ids[0][1],     
    'WalletLink' : ids[1][1], 
    'WalletConnect' : ids[2][1]
  };

  const network = {
    4 : 'Rinkeby',
    43114 : 'Avalanche',
  };

  const handleOpen = (open) => {
    setVisible(open);
    setOpen(!open);
    setCopy('Copy');
  };

  const handleExit = (value) => {
    setVisible(false);
    setCopy('Copy');
    onClose(value);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(account);
    setCopy('Copied!')
  };

  return (
    <Grid item >
      <Dialog onClose={() => handleExit('')} PaperProps={{
        style: { 
          background: 'linear-gradient(165deg, #260530, 75%, #5b226c)',
          borderTop: '3px groove #e6e6fa',
          borderBottom: '3px ridge #e6e6fa'}}} open={open}>
        <DialogTitle sx={{ color: '#fff', background: 'transparent'}}>
          <IconButton onClick={() => handleExit('')} style={{color: '#e6e6fa', position: 'absolute', top: '2px', right: '1px'}} 
          sx={{ ':hover': {
            bgcolor: '#ffffff10'
          }}}>
            <CloseIcon/>
          </IconButton>
          <Typography fontWeight={'bold'} fontSize={'24px'}>Account</Typography>
        </DialogTitle>
        <DialogContent>
          <Paper style={{background: 'radial-gradient(100% 225% at 100% 0%, #FAFF00 0%, #000000 100%), linear-gradient(235deg, #DB00FF 0%, #000000 100%), linear-gradient(45deg, #241E92 0%, #241E92 40%, #5432D3 40%, #5432D3 50%, #7B6CF6 50%, #7B6CF6 70%, #E5A5FF 70%, #E5A5FF 100%), linear-gradient(180deg, #01024E 0%, #01024E 43%, #543864 43%, #543864 62%, #8B4367 62%, #8B4367 80%, #FF6464 80%, #FF6464 100%)',
                         backgroundBlendMode: 'overlay, hard-light, overlay, normal'}} sx={{ pt: 2, pb: 4, pl: 2, pr: 2, borderRadius: 3}}>
            <Typography sx={{pb: 2, color: '#e6e6fa'}} fontSize={10} fontWeight={'bold'}>{account}</Typography>
            <Grid container spacing={2} >
              <Grid item xs={4}>
                <Avatar sx={{ color: '#30083b', bgcolor: '#fff'}}>
                </Avatar>
              </Grid>
              <Grid item container spacing={4} xs={8} sx={{color: '#fff'}}>
                <Grid item xs={6}>
                  <Typography fontSize={12}>Network</Typography>
                  <Typography fontWeight={'bold'} fontSize={15}>{network[chainId]}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontSize={12}>Wallet</Typography>
                  <Typography fontWeight={'bold'} fontSize={15}>{names[current]}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={5}>
            <Grid item style={{color: '#e6e6fa'}} >
              <Button onClick={() => copyAddress()} color='inherit' startIcon={copy == 'Copy' ? <CopyIcon/> : <PasteIcon/>}
              sx={{ ':hover': {
                bgcolor: '#ffffff10'
              }}}>
                <Typography fontSize={13}>{copy}</Typography>
              </Button>
            </Grid>
            <Grid item style={{color: '#e6e6fa'}}>
              <Button target="_blank" href={`https://snowtrace.io/address/${account}`} color='inherit' startIcon={<OpenIcon/>}
                sx={{ ':hover': {
                  bgcolor: '#ffffff10'
                }}}>
                  <Typography fontSize={13}>{'Snowtrace'}</Typography>
                </Button>
            </Grid>
            <Grid item xs style={{color: '#e6e6fa'}} >
              <Button onClick={() => handleOpen(true)} color='inherit' startIcon={<ChangeIcon/>}
              sx={{ ':hover': {
                bgcolor: '#ffffff10'
              }}}>
                <Typography fontSize={13}>{'Change wallet'}</Typography>
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <ConnectDialog 
      onClose={handleExit} 
      handleBack={() => handleOpen(false)} 
      open={visible} 
      current={current}  />
    </Grid>
  );
}

function ConnectButton({ active, account, chainId, login, disabled }) {
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);
  const [memory, setMemory] = React.useState();
  const { setVisible, visible, setCurrent, current} = useStore(state => ({
    setVisible: state.setVisible,
    visible: state.visible,
    setCurrent: state.setCurrent,
    current: state.current,
    }), shallow);

    console.log("component", current);

  const handleClose = async (value) => {
    setOpen(false);
    if (value != '') {
      if (value != current) {
        setCurrent(value);
        const preference = localStorage.getItem('preference');
        if (preference != value && preference) {
          setMemory(value);
          setHidden(false);
        } else {
          handleLogin(value);
        }
      }
    }
  };

  const handleChoice = async (yes) => {
    setHidden(true);
    if (yes) {
      localStorage.setItem('preference', memory);
      setMemory();
    }
    handleLogin(memory);
  }

  const handleClick = () => {
    if (active) {
      setOpen(true);
    } else {
      setVisible(true);
    }
  };

  const handleLogin = async (id) => {
    try {
      const result = await login(id).catch(() => setCurrent());
      if (!result) {
        setCurrent();
      }
    }
    catch {
      setCurrent();
    }
  }

  return (
    <>
      <Button disabled={disabled} onClick={() => handleClick()} sx={{
        borderRadius: active ? '16px' :'60px',
        height: '39px',
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'inherit',
        backgroundBlendMode: active ? 'overlay, color, overlay, difference, color-dodge, difference, normal' : 'overlay, hard-light, normal',
        background: active ? 'linear-gradient(120deg, #FF0000 0%, #2400FF 100%), linear-gradient(120deg, #FA00FF 0%, #208200 100%), linear-gradient(130deg, #00F0FF 0%, #000000 100%), radial-gradient(110% 140% at 15% 90%, #ffffff 0%, #1700A4 100%), radial-gradient(100% 100% at 50% 0%, #AD00FF 0%, #00FFE0 100%), radial-gradient(100% 100% at 50% 0%, #00FFE0 0%, #7300A9 80%), linear-gradient(30deg, #7ca304 0%, #2200AA 100%)' 
        : 'radial-gradient(100% 225% at 100% 0%, #FF0000 0%, #000000 100%), linear-gradient(236deg, #00C2FF 0%, #000000 100%), linear-gradient(135deg, #CDFFEB 0%, #CDFFEB 36%, #009F9D 36%, #009F9D 60%, #07456F 60%, #07456F 67%, #0F0A3C 67%, #0F0A3C 100%)',
        width: '200px',
        padding: 0,
        color: '#fff',
        transition: 'all 0.5s',
        ':hover': {
          opacity: 0.65,
          color: '#fff',
        },
        ':disabled': {
          color: '#fff'
        }
      }} className='btn top-nav-btn'>
        {active ? 
        account.slice(0, 6) + '...' + account.slice(account.length - 5, account.length) 
        :
        'Connect Wallet'}
      </Button>
      <Dialog
        open={!hidden}
        onClose={() => setHidden(true)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: { borderRadius: 12, backgroundColor: '#26062f', maxWidth: '325px' }
        }}
      >
        <DialogTitle className='text-center' sx={{ color: '#ffff', fontSize: 'large' }} id="alert-dialog-title">
          {"Set as default?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#eae6eb', fontSize: 'small', fontWeight: '500'}} align='center' id="alert-dialog-description">
            The website will automatically connect with your default wallet upon loading.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='d-flex justify-content-around'>
          <Button sx={{
            color: '#bbabe3',
            borderRadius: 1,
            ':hover': {
              bgcolor: '#eae6eb10'
          } }} onClick={() => handleChoice(true)}>Yes</Button>
          <Button sx={{
            color: '#bbabe3', 
            borderRadius: 1,
            ':hover': {
              bgcolor: '#eae6eb10'
          } }} onClick={() => handleChoice(false)}>No</Button>
        </DialogActions>
      </Dialog>
      <UserPanel 
      onClose={handleClose} 
      setOpen={setOpen} 
      setVisible={setVisible} 
      open={open} 
      current={current} 
      visible={visible} 
      account={account} 
      chainId={chainId} />
    </>
  )
}

export default ConnectButton;