import React from 'react';
import TableRow from './components/tableRow';
import TableRowSkeleton from './components/tableRowSkeleton';
import { useSelector, useDispatch } from 'react-redux';
import { changeSelectedGage } from '../../reducers/main';

function table(props) {
  const { data, clickableRow } = props;
  const dispatch = useDispatch();
  const { selectedGage } = useSelector((state) => state.eternal);

  const handleClickOnGage = (gageAddress) => {
    dispatch(changeSelectedGage({ selectedGage: gageAddress }));
  };

  return (
    <div className='grid'>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Gage Type</th>
            <th scope='col'>Date of Initiation</th>
            <th scope='col'>Deposit</th>
            <th scope='col'>Bonus</th>
            <th scope='col'>Risk</th>
            <th scope='col'>Condition</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data?.map((item, index) => (
              <TableRow
                type={item.gageType}
                active={item.gageAddress === selectedGage}
                key={index}
                index={index + 1}
                created_at={item.created_at}
                amount={item.amount}
                asset={item.asset}
                riskPercentage={item.riskPercentage}
                bonusPercentage={item.bonusPercentage}
                condition = {item.condition}
                handleClick={clickableRow ? () => handleClickOnGage(item.gageAddress) : () => ({})}
              />
            ))
          ) : (
            <TableRowSkeleton />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default table;
