import HttpActionDetail from "../../components/HttpAction";
import TagAction from "../../components/TagAction";
import { ActiveActionType, nativeActions } from "../../store/actions";

interface IActionView {
  action: ActiveActionType;
  isReadOnlyMode?: boolean;
  showOnlySummary?: boolean;
}

const ActionView = ({ action, isReadOnlyMode = false, showOnlySummary = false }: IActionView) => {
  const actionTypeToComponentMap = {
    [nativeActions.tag.name]: TagAction,
    [nativeActions.httpReq.name]: HttpActionDetail
  };
  const ActionComponent = actionTypeToComponentMap[action.name];
  return (
    <ActionComponent actionId={action.id} isReadOnlyMode={isReadOnlyMode} showOnlySummary={showOnlySummary} />
  );
}

export default ActionView;
