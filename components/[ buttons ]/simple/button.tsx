import style from './style.module.scss';
import Loading from '../../[ loaders ]/animation/Loading';
import { NextPage } from 'next';
import Flow from 'components/flows [ modal ]/flow';
import { ReactElement, useState } from 'react';
import { IButtonState, IButtonTheme } from 'components/[ buttons ]/enums';

interface IButtonProps {
  state?: IButtonState;
  theme?: IButtonTheme;
  styling?: 'inherit' | 'default';

  func?: () => void;
  process?: boolean;
  isDisable?: boolean;
  isLoading?: boolean;
  isStraightForm?: boolean;

  description?: ReactElement;
  orient?: 'left' | 'right' | 'top' | 'bottom';
  position?: -1 | 0 | 1;
}

const SimpleButton: NextPage<IButtonProps> = ({
  children,
  state = IButtonState.secondary,
  theme = IButtonTheme.day,
  styling = 'default',
  func = () => {},
  isDisable,
  isLoading,
  process = false,
  isStraightForm = false,

  description,
  orient = 'top',
  position = 0,
}) => {
  const [isFlowOpened, setFlowOpened] = useState(false);

  return (
    <div
      onClick={func}
      className={style.button}
      data-state={state}
      data-theme={theme}
      data-process={process}
      data-disable={isDisable}
      data-loading={isLoading}
      data-styling={styling}
      onMouseEnter={() => setFlowOpened(true)}
      onMouseLeave={() => setFlowOpened(false)}
      style={{ padding: isStraightForm ? '10px' : undefined }}>
      <Loading size={isStraightForm ? 14 : undefined} process={process} negative={theme === IButtonTheme.night}/>
      <div className={style.content}>{children}</div>
      {description ? (
        <Flow position={position} orient={orient} isOpened={isFlowOpened}>
          <h5>{description}</h5>
        </Flow>
      ) : null}
    </div>
  );
};

export default SimpleButton;
