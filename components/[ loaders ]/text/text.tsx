import style from './style.module.scss';
import { FC, useEffect, useState } from 'react';
import Flow from 'components/flows [ modal ]/flow';

export enum fonts {
  h12 = 'h5',
  h14 = 'h4',
  h16 = 'h3',
  h18 = 'h2',
  h24 = 'h1',
}

export enum fills {
  day = 'rgba(0,0,0,0.05)',
  night = 'rgba(255,255,255,0.05)',
}

interface TextProps {
  font: fonts;
  color?: string;
  text: string | undefined | null;
  placeholder: string;
  borderRadius?: number;
  align?: 'left' | 'right' | 'center';
  width?: string;
  transparent?: boolean;
  fill?: fills;
  func?: () => void;

  description?: string;
  position?: -1 | 0 | 1;
  orient?: 'left' | 'top' | 'right' | 'bottom';
}

const TextLoader: FC<TextProps> = ({
  font,
  text,
  placeholder,

  transparent = false,
  align = 'left',
  width = 'auto',
  func,
  fill = fills.day,
  borderRadius = 3,
  color,
  description,
  position = 0,
  orient = 'left',
}) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <div
      className={style.parent}
      onClick={() => (func ? func() : null)}
      data-loading={!text}
      data-description={!!description}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: func ? 'pointer' : description ? 'default' : 'inherit',
        background: !text && !transparent ? fill : 'transparent',
        borderRadius,
        textAlign: align,
        maxWidth: width,
        color,
      }}>
      {description ? (
        <>
          <Flow orient={orient} isOpened={isHovered} position={position}>
            <pre
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                maxWidth: '400px',
                whiteSpace: 'pre-wrap',
                width: 'max-content',
              }}>
              {description}
            </pre>
          </Flow>
          <div className={style.outline} />
        </>
      ) : null}
      {font === fonts.h12 ? (
        <h5 className={style.text}>{!text ? placeholder : text}</h5>
      ) : null}

      {font === fonts.h14 ? (
        <h4 className={style.text}>{!text ? placeholder : text}</h4>
      ) : null}

      {font === fonts.h16 ? (
        <h3 className={style.text}>{!text ? placeholder : text}</h3>
      ) : null}

      {font === fonts.h18 ? (
        <h2 className={style.text}>{!text ? placeholder : text}</h2>
      ) : null}
      {font === fonts.h24 ? (
        <h1 className={style.text}>{!text ? placeholder : text}</h1>
      ) : null}
    </div>
  );
};

export default TextLoader;
