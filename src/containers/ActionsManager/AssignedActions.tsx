import { useDispatch, useSelector } from "react-redux";
import AdditiveList, { IListItem } from "../../components/AdditiveList";
import { ActiveActionType, changeView, IActionState, views } from "../../store/actions";

interface IAssignedActionsProps {
  onActionClick: (action: ActiveActionType) => void;
}

const AssignedActions = ({ onActionClick }: IAssignedActionsProps) => {
  const dispatch = useDispatch();
  const assignedActions = useSelector((state: IActionState) => state.activeActions);
  return (
    <>
      <div className='mb-4'>Assigned actions</div>
      <div className='color-disabled mb-22 fs-14 mb-22'>
        The selected actions will run in the background when the user journey gets to this element
      </div>
      <AdditiveList
        subject='Action'
        onAddNew={() => dispatch(changeView(views.actionsSelector))}
        onListItemclick={onActionClick as (action: IListItem) => void}
        listItems={assignedActions}
        labelKey='name'
        iconKey='icon'
        isActiveKey='isActive'
      />
    </>
  );
}

export default AssignedActions;
