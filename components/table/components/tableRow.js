import React from 'react';
import moment from 'moment';

function tableRow(props) {
  const { type, created_at, asset, amount, bonusPercentage, riskPercentage, condition, index, active, handleClick } = props;
  return (
    <tr onClick={handleClick}>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>
        Gage {index} {type}
      </td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>{moment(created_at).format('DD-MM-yyyy')}</td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>
        <span>{amount} </span> <span className='coin-name'>{asset}</span>
      </td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>{bonusPercentage}%</td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>{riskPercentage}%</td>
      <td style={{ background: active ? '#9c5cac' : '', cursor: 'pointer' }}>{condition}</td>
    </tr>
  );
}

export default tableRow;


/**{' '}
        <span className={`risk-val ${riskType === 'safe' ? 'safe' : 'superior'}`}>{riskType === 'safe' ? 'Safe' : 'Superior'}</span> */
