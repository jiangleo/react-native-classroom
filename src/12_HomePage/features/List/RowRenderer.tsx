import React from 'react';
import WaterFallCard, {RecyclerNFT} from '../WaterFallCard';
import Icons, {RecyclerIcons} from '../Icons';

function RowRenderer(type: number | string, data: RecyclerNFT | RecyclerIcons) {
  if (type === 'CARD') {
    return <WaterFallCard row={data as RecyclerNFT} />;
  } else if (type === 'ICONS') {
    return <Icons row={data as RecyclerIcons} />;
  }
  return null;
}

export default RowRenderer;
