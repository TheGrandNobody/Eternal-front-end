import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getAddress } from '../../../helpers/addressHelper';
import { toBN, fromWei, toDecimal } from 'web3-utils';
import { getContractFast } from '../../../helpers/ContractHelper';
import { useSelector } from 'react-redux';
import { toNumber } from 'lodash';
import { Box, CircularProgress } from '@mui/material';

function tableRow(props) {
  const { type, created_at, asset, id, active, winner, closed, handleClick, account, library} = props;
  const [amount, setAmount] = useState('');
  const [bonus, setBonus] = useState('');
  const [risk, setRisk] = useState('');
  const [percent, setPercent] = useState('');

  const { loadedContracts } = useSelector((state) => state.eternal);


  useEffect(() => {
    (async () => {
      setAmount('');
      setBonus('');
      setRisk('');
      setPercent('');
      await handleStats(id);
    })();
  }, [loadedContracts[id]]);

  const handleStats = async (id) => {
    if (loadedContracts[id]) {
      let contract = (type == 'Liquid' || type == 'Loyalty') ? getContractFast(loadedContracts[id].address, 'loyalty', library, account) : loadedContracts[id];
      const userData = await contract.viewUserData(account);
      const treasuryData = await contract.viewUserData(getAddress('treasury'));
      const condition = fromWei(toBN(await contract.viewTarget()));
  
      const amount = fromWei(toBN(userData[1]));
      const risk = toDecimal(userData[2]);
      const bonus = toDecimal(treasuryData[2]);
      setAmount(amount);
      setBonus(bonus / 100);
      setRisk((risk - bonus) / 100);
      setPercent(condition);
    }
  };

  return (
    <tr align="center" valign="center" onClick={handleClick}>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>
      <span style={{ background: active ? '#280531' : ''}} className='gage-name'>{type}</span>
      </td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>{moment(created_at).format('DD-MM-yyyy')}</td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>
        {amount == '' ?
          <Box sx={{ color: '#e6e6fa'}}>
            <CircularProgress color='inherit' size={14} />
          </Box>
        :
          <>
          <span>{amount}</span> <span style={{ background: active ? '#280531' : ''}} className='bold coin-name'>{asset}</span>
          </>
        }
      </td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>
        {bonus == '' ?
          <Box sx={{ color: '#e6e6fa'}}>
            <CircularProgress color='inherit' size={14} />
          </Box>
        :
          <>
          {bonus}%
          </>
        }
      </td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>
        {risk == '' ?
          <Box sx={{ color: '#e6e6fa'}}>
            <CircularProgress color='inherit' size={14} />
          </Box>
        :
          <>
          {risk}%
          </>
        }
      </td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>
        {percent == '' ?
          <Box sx={{ color: '#e6e6fa'}}>
            <CircularProgress color='inherit' size={14} />
          </Box>
        :
        <>
          <span>{toNumber(percent).toFixed(2)}</span> <span style={{ background: active ? '#280531' : ''}} className='bold coin-name'>ETRNL</span>
        </>
        }
      </td>
      {(!closed) ? <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>{winner ? 'You' : 'Treasury'}</td> : ''}
    </tr>
  );
}

export default tableRow;
