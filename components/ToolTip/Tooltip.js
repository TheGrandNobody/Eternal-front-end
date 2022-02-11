import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Button, Fade } from '@mui/material';

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#c35c6c',
    color: '#fff',
    fontSize: theme.typography.pxToRem(12),
  },
}));

function TooltipComponent({ text }) {
  return (
    <HtmlTooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 350 }}
      title={text}>
      <Button sx={{minWidth: '1px', 
                  height: '3vmin', 
                  width: '3vmin', 
                  borderRadius: '50%',
                  }}>
          <svg height='20' width='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='10' cy='10' r='10' fill='white' />
              <path
                d='M 10.6239 12.0281 H 9.127 V 11.22 C 9.127 10.8668 9.1668 10.6063 9.2463 10.4385 C 9.3346 10.2619 9.52 10.0322 9.8026 9.7496 L 10.7696 8.7826 C 10.9728 8.5618 11.0743 8.2881 11.0743 7.9613 C 11.0743 7.6346 10.9684 7.3652 10.7564 7.1533 C 10.5445 6.9325 10.2707 6.8221 9.9351 6.8221 C 9.5995 6.8221 9.3169 6.9281 9.0873 7.14 C 8.8665 7.3431 8.7385 7.6169 8.7031 7.9613 H 7.1003 C 7.1886 7.1753 7.4933 6.5616 8.0143 6.12 C 8.5442 5.6696 9.2021 5.4444 9.9881 5.4444 C 10.7741 5.4444 11.4143 5.6608 11.9089 6.0935 C 12.4034 6.5174 12.6507 7.1135 12.6507 7.8818 C 12.6507 8.4117 12.505 8.8533 12.2135 9.2065 C 12.0458 9.4185 11.9177 9.5686 11.8294 9.6569 C 11.7411 9.7452 11.6219 9.86 11.4717 10.0013 C 11.3304 10.1338 11.2068 10.253 11.1008 10.359 C 11.0037 10.4561 10.9242 10.54 10.8624 10.6107 C 10.7034 10.805 10.6239 11.0787 10.6239 11.432 V 12.0281 Z M 9.8954 14.9689 C 9.6216 14.9689 9.3831 14.8762 9.18 14.6907 C 8.9769 14.4964 8.8754 14.2668 8.8754 14.0019 C 8.8754 13.7281 8.9725 13.4941 9.1668 13.2998 C 9.3699 13.1055 9.6083 13.0084 9.8821 13.0084 C 10.1647 13.0084 10.4076 13.1055 10.6107 13.2998 C 10.8138 13.4852 10.9154 13.7149 10.9154 13.9886 C 10.9154 14.2536 10.8138 14.4832 10.6107 14.6775 C 10.4164 14.8717 10.178 14.9689 9.8954 14.9689 Z'
                fill='#440C54'
              />
          </svg> 
      </Button>  
    </HtmlTooltip>
  );
}

export default TooltipComponent;
