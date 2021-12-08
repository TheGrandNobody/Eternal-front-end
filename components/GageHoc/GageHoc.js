import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import GageSelection1 from '../gage-selection-1';
import GageSelection2 from '../gage-selection-2';

function GageHoc() {
  const { gageType } = useSelector((state) => state.eternal);
  return <> {gageType ? <GageSelection2 /> : <GageSelection1 />}</>;
}

export default GageHoc;