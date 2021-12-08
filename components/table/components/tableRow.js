import React from 'react';
import moment from 'moment';

function tableRow(props) {
  const { type, created_at, no_of_users, amount, riskType, riskPercentage, index, active, handleClick } = props;
  return (
    <tr onClick={handleClick}>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>
        Gage {index} {type}
      </td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>{moment(created_at).format('DD-MM-yyyy')}</td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>{no_of_users}</td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>
        <span>{amount} </span> <span className='coin-name'>ETRNL</span>
      </td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>
        <span>{riskPercentage}% </span>{' '}
        <span className={`risk-val ${riskType === 'safe' ? 'safe' : 'superior'}`}>{riskType === 'safe' ? 'Safe' : 'Superior'}</span>
      </td>
    </tr>
  );
}

export default tableRow;
