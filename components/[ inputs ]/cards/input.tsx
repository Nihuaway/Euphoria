import type { NextPage } from 'next';
import style from './style.module.scss';
import Icon, { IconVariant } from '../../icon/icon';
import {
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { IButtonTheme } from 'components/[ buttons ]/enums';
import { ThemeVariant } from 'interfaces/enums';

interface props {
  id?: number | string;
  placeholder?: string;
  items: string[];

  topInput?: ReactElement;
  bottomInput?: ReactElement;
  //leftInput?: ReactElement;
  //rightInput?: ReactElement;

  onChange: (items: string[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onEnd?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onValidate?: (e: ChangeEvent<HTMLTextAreaElement>) => string;

  theme?: IButtonTheme;

  isActive?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isValid?: boolean;
}

const CardInput: NextPage<props> = ({
  id = 0,
  placeholder = '...',
  items,
  topInput,
  bottomInput,
  //leftInput,
  //rightInput,
  onChange,
  onValidate = (e) => e.target.value,
  onFocus,
  onBlur,
  onEnd,
  theme = IButtonTheme.day,
  isActive,
  isRequired = false,
  isDisabled = false,
  isValid = true,
}) => {
  const [inFocus, setFocus] = useState(false);
  const [currentCard, setCurrentCard] = useState('');
  const [twiceDel, setTwiceDel] = useState(false);

  useEffect(() => {
    setTwiceDel(false);
  }, [currentCard]);

  return (
    <div className={style.input} data-focused={inFocus}>
      {topInput}
      <h4
        placeholder={placeholder}
        className={style.place}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}>
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className={style.item}
              onClick={() => onChange(items.filter((item, i) => i !== index))}>
              {item}
              <Icon id={IconVariant.close} size={14} />
            </div>
          );
        })}
        <input
          value={currentCard}
          maxLength={16}
          className={style.addPlace}
          placeholder={items.length > 0 ? ' ...' /*'🠔 to del'*/ : 'Add'}
          type={'text'}
          onChange={(e) => setCurrentCard(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && currentCard) {
              onChange([...items, currentCard]);
              setCurrentCard('');
            }
            // else if(e.key==='Backspace' && !currentCard){
            //   if(!twiceDel){
            //     setTwiceDel(true);
            //     return;
            //   }
            //   onChange(items.slice(0, items.length-1));
            //   setTwiceDel(false);
            // }
          }}
        />
      </h4>
      {bottomInput}
    </div>
  );
};

export default CardInput;
