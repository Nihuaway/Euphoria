import type { NextPage } from 'next';
import style from './style.module.scss';
import Button_SIMPLE, {  } from 'components/[ buttons ]/simple/button';
import { useState } from 'react';
import Button_DROPPUSH from 'components/[ buttons ]/dropdown/default/button';
import { IButtonState } from 'components/[ buttons ]/enums';

interface props {
  state: boolean;
  title: string;
  onEdit: (value: string) => void;
  onPushed: (isDraft: boolean) => void;
}

const ShotUploadTop: NextPage<props> = ({title,state,onEdit, onPushed}) => {

  return (
    <div className={style.title}>
      <Button_SIMPLE state={IButtonState.secondary} func={() => {}}>
        Cancel
      </Button_SIMPLE>
      <hr />
      {!state ? (
        <div className={style.texts}>
          <h1>What are you working on?</h1>
          <h4>
            Upload your design. This will also be used as the thumbnail in
            feeds.
          </h4>
        </div>
      ) : (
        <input
          type="text"
          placeholder={'Title'}
          value={title}
          className={style.name}
          onChange={(e) => {
            onEdit(e.target.value)
          }}
        />
      )}

      <hr />
      <Button_DROPPUSH items={['Upload', 'Save as Draft']} onChange={(id) => onPushed(id===1)} isDisabled={!state || !title}>
        <h4>Upload</h4>
      </Button_DROPPUSH>
    </div>
  );
};

export default ShotUploadTop;