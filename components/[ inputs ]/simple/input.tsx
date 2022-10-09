import type { NextPage } from 'next';
import style from './style.module.scss';
import { ChangeEvent, ReactElement, useState, KeyboardEvent } from 'react';
import { IButtonTheme } from 'components/[ buttons ]/enums';

interface props {
  id?: number | string;
  placeholder?: string;
  value: string | null | undefined;

  topInput?: ReactElement;
  bottomInput?: ReactElement;
  leftInput?: ReactElement;
  rightInput?: ReactElement;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onEnd?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onValidate?: (e: ChangeEvent<HTMLInputElement>) => string;

  type?: 'text' | 'password' | 'email';
  autoComplete?: 'on' | 'off' | 'new-password';

  theme?: IButtonTheme;

  isActive?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isValid?: boolean;
}

const SimpleInput: NextPage<props> = ({
  id = 0,
  placeholder = '...',
  value,
  topInput,
  bottomInput,
  leftInput,
  rightInput,
  onChange = (e) => {},
  onValidate = (e) => e.target.value,
  onFocus,
  onBlur,
  onEnd = (value) => {},
  type = 'text',
  autoComplete = 'on',
  theme = IButtonTheme.day,
  isActive,
  isRequired = false,
  isDisabled = false,
  isValid = true,
}) => {
  const [isActiveLocal, setActiveLocal] = useState(false);

  return (
    <div className={style.parent} data-theme={theme}>
      {topInput}
      <label
        htmlFor={`input#${id}`}
        className={style.label}
        data-active={onFocus || onBlur ? isActive : isActiveLocal}
        data-valid={isValid ? isValid : isDisabled}>
        {leftInput}
        <input
          id={`input#${id}`}
          autoComplete={autoComplete}
          value={value ? value : ''}
          type={type}
          required={isRequired}
          disabled={isDisabled}
          placeholder={placeholder}
          onChange={(e) => {
            e.target.value = onValidate(e);
            onChange(e);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              // @ts-ignore
              onEnd(e);
            }
          }}
          onFocus={() => {
            onFocus ? onFocus() : setActiveLocal(true);
          }}
          onBlur={() => {
            onBlur ? onBlur() : setActiveLocal(false);
          }}
        />
        {rightInput}
      </label>
      {bottomInput}
    </div>
  );
};

export default SimpleInput;
