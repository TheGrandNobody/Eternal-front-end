import React from 'react';
import TableRow from './components/tableRow';
import TableRowSkeleton from './components/tableRowSkeleton';
function table(props) {
  const { data } = props;
  return (
    <div className='grid'>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Gage Type</th>
            <th scope='col'>Date of Initiation</th>
            <th scope='col'>Total Number of Users</th>
            <th scope='col'>Deposit</th>
            <th scope='col'>Risk</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data?.map((item, index) => (
              <TableRow
                type={item.gageType}
                key={index}
                created_at={item.created_at}
                no_of_users={item.gageTotalUsers}
                amount={item.amount}
                riskType={item.riskType}
                riskPercentage={item.riskPercentage}
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
