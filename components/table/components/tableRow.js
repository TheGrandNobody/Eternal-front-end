import React from 'react';

function tableRow(props) {
  const { type, created_at, no_of_users, amount, riskType, riskPercentage } = props;
  return (
    <tr>
      <td>{type}</td>
      <td>25-04-2021</td>
      <td>{no_of_users}</td>
      <td>
        <span>{amount} </span> <span className='coin-name'>ETRNL</span>
      </td>
      <td>
        <span>{riskPercentage}% </span>{' '}
        <span className={`risk-val ${riskType === 'safe' ? 'safe' : 'superior'}`}>{riskType === 'safe' ? 'Safe' : 'Superior'}</span>
      </td>
    </tr>
  );
}

export default tableRow;
