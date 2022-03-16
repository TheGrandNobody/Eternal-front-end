import React from 'react';
import TableRow from './components/tableRow';
import TableRowSkeleton from './components/tableRowSkeleton';
import useStore from '../../store/useStore';
import shallow from "zustand/shallow";

function table(props) {
  const { data, clickableRow, account, library} = props;
  
  const { selectedGage, setSelected, setType } = useStore(state => ({
    selectedGage: state.selectedGage,
    setSelected: state.setSelected,
    setType: state.setType
  }), shallow);

  const handleClickOnGage = (id, type) => {
    setSelected(id);
    setType(type);
  };

  return (
    <div className='grid'>
      <table className='table'>
        <thead>
          <tr align="center" valign="center">
            <th scope='col'>Gage Type</th>
            <th scope='col'>Date of Initiation</th>
            <th scope='col'>Deposit</th>
            <th scope='col'>Bonus</th>
            <th scope='col'>Risk</th>
            <th scope='col'>Condition</th>
            {(!clickableRow) ?  <th scope='col'>Winner</th> : ''}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data?.map((item, index) => (
              <TableRow
                type={item.type}
                active={item.id === selectedGage}
                key={index}
                id = {item.id}
                created_at={item.created_at}
                asset={item.deposit}
                winner={item.winner}
                closed={clickableRow}
                handleClick={clickableRow ? () => handleClickOnGage(item.id, item.type) : () => ({})}
                account={account}
                library={library}
              />
            ))
          ) : (
            <TableRowSkeleton closed={!clickableRow} />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default table;
