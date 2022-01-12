import { useSelector } from "react-redux";
import { ActiveActionType, IActionState } from "../../store/actions";
import ActionView from "./ActionView";


interface IActionViewProps {
  selectedAction?: ActiveActionType;
}

const ActionsInfo = ({ selectedAction }: IActionViewProps) => {
  const actions = useSelector((state: IActionState) => state.activeActions);
  return (
    <div className='pt-14 pb-14 pl-14 pr-14'>
      {selectedAction ?
        <ActionView isReadOnlyMode={true} action={selectedAction} />
        :
        actions.map((action) => (
          <div className='mb-14' key={action.id} >
            <ActionView isReadOnlyMode={true} action={action} showOnlySummary={true} />
          </div>
        ))}
    </div>
  );
}

export default ActionsInfo;
