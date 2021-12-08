import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#c35c6c',
    color: '#fff',
    // maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
  },
}));

function TooltipComponent({ children, text }) {
  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography color='inherit'>{text}</Typography>
        </React.Fragment>
      }>
      <ButtonBase>{children}</ButtonBase>
    </HtmlTooltip>
  );
}

export default TooltipComponent;
