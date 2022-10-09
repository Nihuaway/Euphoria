import type { NextPage } from 'next';
import style from 'components/[ pages ]/shot/[ id ]/slider/images/main/palette/style.module.scss';
import React from 'react';
import Icon, { IconVariant } from 'components/icon/icon';
import { IPalette } from 'interfaces/models/image';
import Flow from 'components/flows [ modal ]/flow';

interface props {
  palette: IPalette | null;
}

const ShotSliderMainItemPalette: NextPage<props> = ({ palette }) => {
  if (!palette) return null;

  return (
    <div className={style.info}>
      <div
        className={style.palette}
        style={{ background: `${palette.mutedDark.hex}BF` }}>
        <Icon id={IconVariant.palette} size={14} />
        <hr />
        <div className={style.paletteList}>
          <div className={style.paletteListItem}>
            <div
              className={style.button}
              style={{ background: palette.vibrant.hex }} />
            <h5>{palette.vibrant.hex}</h5>
          </div>

          <div className={style.paletteListItem}>
            <div
              className={style.button}
              style={{ background: palette.vibrantDark.hex }} />
            <h5>{palette.vibrantDark.hex}</h5>
          </div>
          <div className={style.paletteListItem}>
            <div
              className={style.button}
              style={{ background: palette.vibrantLight.hex }} />
            <h5>{palette.vibrantLight.hex}</h5>
          </div>
          <div className={style.paletteListItem}>
            <div
              className={style.button}
              style={{ background: palette.muted.hex }} />
            <h5>{palette.muted.hex}</h5>
          </div>
          <div className={style.paletteListItem}>
            <div
              className={style.button}
              style={{
                background: palette.mutedDark.hex,
                outline: `1px dashed ${palette.mutedLight.hex}BF`,
                outlineOffset: '-1px',
              }} />
            <h5>{palette.muted.hex}</h5>
          </div>
          <div className={style.paletteListItem}>
            <div
              className={style.button}
              style={{ background: palette.mutedLight.hex }} />
            <h5>{palette.mutedLight.hex}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShotSliderMainItemPalette;