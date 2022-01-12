import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SelectionList, { IListItem } from '../../components/SelectionList';
import { addActions, changeView, IAction, nativeActions, views } from '../../store/actions';
import styles from './ActionsManager.module.scss';

const groupedActions = [
  {
    title: 'Native Popup actions',
    listItems: Object.values(nativeActions)
  }
];

interface IActionState {
  footerClassName?: string;
}

const ActionsSelector = ({ footerClassName = '' }: IActionState) => {
  const dispatch = useDispatch();

  const selectedActions = useRef<IAction[]>([]);
  /**
   * onSelectionChange handler for SelectionList component
   * @param action // Action that is selected/unselected
   * @param isSelect // true if it a selection and false if it is unselection
   */
  const onSelectionChange = (action: IListItem, isSelect?: boolean) => {
    if (isSelect) {
      selectedActions.current.push(action);
    } else {
      selectedActions.current = selectedActions.current.filter(({ name }) => name !== action.name);
    }
    if (showFooter !== Boolean(selectedActions.current.length)) {
      setShowFooter(!showFooter);
    }
  }

  const [showFooter, setShowFooter] = useState<boolean>(Boolean(selectedActions.current.length));

  const onConfirm = () => {
    selectedActions.current?.length && dispatch(addActions(selectedActions.current))
    gotoAssignedActions();
  }

  const gotoAssignedActions = () => {
    dispatch(changeView(views.activeActions))
  }

  return (
    <div className='d-flex align-items-stretch flex-column h-100'>
      <div className='overflow-y-auto'>
        <SelectionList
          groupedListItems={groupedActions}
          onSelectionChange={onSelectionChange}
        />
      </div>
      {
        showFooter && <footer className={`mt-auto ${styles.footer} ${footerClassName}`}>
          <button
            className='btn btn-secondary mr-14'
            onClick={gotoAssignedActions}
          >Cancel</button>
          <button
            className='btn btn-primary'
            onClick={onConfirm}
          >Confirm</button>
        </footer>
      }
    </div>)
}

export default ActionsSelector;
