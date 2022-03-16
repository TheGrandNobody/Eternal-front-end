import React from 'react';
import useStore from '../../store/useStore';
import GageSelection1 from '../gage-selection-1';
import GageSelection2 from '../gage-selection-2';

function GageHook() {
  const type = useStore(state => state.type);
  return <> {!type ? <GageSelection1 /> : <GageSelection2 />}</>;
}

export default GageHook;
