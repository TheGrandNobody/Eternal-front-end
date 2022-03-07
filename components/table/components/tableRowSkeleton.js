import React from 'react';

function tableRowSkeleton(closed) {
  return (
    <tr>
      <td align="center" valign="center" colSpan={closed ? "7" : "6"} scope="colgroup">No Data Found!</td>
    </tr>
  );
}

export default tableRowSkeleton;
