import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuLayout from '../../components/SideMenuLayout.tsx';
import { ActiveActionType, changeView, deleteActionById, IActionState, toggleActiveStatusById, views } from '../../store/actions';
import ActionsInfo from './ActionsInfo';
import ActionsSelector from './ActionsSelector';
import ActionView from './ActionView';

import AssignedActions from './AssignedActions';

const ActionsManager = () => {
  const dispatch = useDispatch();
  const viewType = useSelector((state: IActionState) => state.view);
  const [selectedAction, setSelectedAction] = useState<ActiveActionType>();

  const headerProps = useMemo(() => {
    if (viewType === views.actionsSelector) {
      return {
        title: 'Add actions',
        enableOptions: false,
        enableBackIcon: true
      }
    } else if (viewType === views.activeActions) {
      return {
        title: <><i className='fas fa-bolt fw-bold mr-22' />Actions</>,
        titleClassname: 'color-yellow fw-bold',
        enableOptions: false,
        enableBackIcon: false
      }
    } else {
      return {
        title: selectedAction?.name || '',
        enableOptions: true,
        enableBackIcon: true,
        menuItems: [
          { icon: 'fas fa-toggle-off', label: selectedAction?.isActive ? 'Make inactive' : 'Make active', onClick: () => { dispatch(toggleActiveStatusById(selectedAction?.id as number)) } },
          { icon: 'fas fa-trash-alt', label: 'Delecte', onClick: () => { dispatch(deleteActionById(selectedAction?.id as number)); dispatch(changeView(views.activeActions)) }, className: 'color-danger' },
        ]
      }
    }
  }, [dispatch, viewType, selectedAction]);

  const onActionClick = (action: ActiveActionType) => {
    setSelectedAction(action);
    dispatch(changeView(views.configureAction));
  }

  return (
    <SideMenuLayout
      sideMenuContent={
        <div className='d-flex align-items-stretch flex-column h-100 overflow-hidden br-14'>
          <Header {...headerProps} onBack={() => dispatch(changeView(views.activeActions))} />
          <div className='pl-22 pr-22 pt-14 pb-14 h-100 overflow-y-auto'>
            {viewType === views.actionsSelector && <ActionsSelector footerClassName='ml-n-22 mr-n-22 mb-n-14' />}
            {viewType === views.activeActions && <AssignedActions onActionClick={onActionClick} />}
            {viewType === views.configureAction && <ActionView action={selectedAction as ActiveActionType} />}
          </div>
        </div>
      }
      mainContent={
        <div className='overflow-y-auto h-100' >
          <ActionsInfo selectedAction={viewType === views.configureAction ? selectedAction : undefined} />
        </div >
      }
    />
  );
}

export default ActionsManager;
