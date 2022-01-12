import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IActionState, ITagAction, updateAction } from "../../store/actions";
import TextInput from "../TextInput";

import styles from './TagAction.module.scss';

interface ITagActionDetail {
  isReadOnlyMode?: boolean;
  showOnlySummary?: boolean;
  actionId: number;
}

const TagActionDetail = ({ isReadOnlyMode, showOnlySummary, actionId }: ITagActionDetail) => {
  const action = useSelector((state: IActionState) => state.activeActions).find((action => action.id === actionId)) as ITagAction
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.which === 13 || e.keyCode === 13) && value && action) {
      if (action.tags?.find(({ name }) => value.trim().toLowerCase() === name.trim().toLowerCase())) {
        window.alert('Tag already exist');
        return;
      }
      dispatch(updateAction({ ...action, tags: [...(action.tags || []), { name: value.trim(), color: `#${Math.floor(Math.random() * 16777215).toString(16)}` }] }))
      setValue('');
    }
  }
  return (
    <div className={isReadOnlyMode || showOnlySummary ? 'br-14 border-grey' : ''}>
      {isReadOnlyMode || showOnlySummary ?
        <div className={`d-flex align-items-center p-24 ${showOnlySummary || !action.tags?.length ? '' : 'border-bottom-grey'}`}>
          <i className={`${action.icon} mr-14`} />
          {action.name}
        </div> :
        <TextInput
          icon='fas fa-plus'
          placeholder='Add tag...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />}
      {Boolean(action.tags?.length) && !showOnlySummary && <ul className={`${isReadOnlyMode ? 'pl-14 pr-14 pt-7 pb-7' : 'p-0'} m-0`}>
        {action.tags?.map(({ name, color }, i) => (
          <li
            key={`${name}_${i}`}
            className={`destyle-list d-flex align-items-center \
              text-ellipsis ${isReadOnlyMode ? 'border-grey' : 'bg-grey'} br-14 ${styles.listItem}`}
          >
            <div className={`${styles.tagColor} mr-14 border-grey`} style={{ backgroundColor: color }} />
            {name}
          </li>
        ))}
      </ul>
      }
    </div >
  );
}

export default TagActionDetail;
