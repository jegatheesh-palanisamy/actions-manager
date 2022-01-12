import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IActionState, IHttpReqAction, updateAction } from "../../store/actions";
import { isValidJson } from "../../utils";
import KeyValuePair from "../KeyValuePair";
import SelectInput, { IOption } from "../SelectInput";
import TextArea from "../TextArea";
import TextInput from "../TextInput";

interface IHttpActionDetailProps {
  isReadOnlyMode?: boolean;
  actionId: number;
  showOnlySummary?: boolean;
}

const methodOptions = [
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'DELETE', value: 'DELETE' },
  { label: 'PATCH', value: 'POST' },
];

const HttpActionDetail = ({ showOnlySummary = false, isReadOnlyMode = false, actionId }: IHttpActionDetailProps) => {
  const action = useSelector((state: IActionState) => state.activeActions).find((action => action.id === actionId)) as IHttpReqAction;
  const dispatch = useDispatch();
  const [isBodyValid, setIsBodyValid] = useState(action.body ? isValidJson(action.body) : true);

  return (
    <div className={`${isReadOnlyMode ? `br-14 ${!showOnlySummary ? 'border-primary' : 'border-grey'}` : ''}`}>
      {isReadOnlyMode &&
        <div className={`d-flex align-items-center p-24 ${showOnlySummary ? '' : 'border-bottom-grey'}`}>
          <i className={`${action.icon} mr-14`} />
          {action.name}
        </div>}
      {!(isReadOnlyMode || showOnlySummary) &&
        <>
          <TextInput
            className='mb-14'
            label='Request endpoint'
            placeholder='Enter endpoint...'
            value={action.url}
            onChange={(e) => dispatch(updateAction({ ...action, url: e.target.value }))}
          />
          <SelectInput
            className='mb-14'
            label='Request method'
            placeholder='Enter endpoint...'
            options={methodOptions}
            value={methodOptions.find(({ value }) => action.method === value)}
            onSelect={({ value }: IOption) => dispatch(updateAction({ ...action, method: value as any }))}
          />
          <KeyValuePair
            className='mb-14'
            value={action.keyValPair}
            onChange={(keyValPair) => dispatch(updateAction({ ...action, keyValPair }))}
          />
          <TextArea
            label='Response body'
            value={action.body}
            showWarning={!isBodyValid}
            onBlur={({ target: { value } }) => setIsBodyValid(value ? isValidJson(value) : true)}
            onChange={(e) => dispatch(updateAction({ ...action, body: e.target.value }))}
          />
        </>}
      {isReadOnlyMode && !showOnlySummary && <>
        <div className='border-bottom-grey pl-40 pr-40 pt-14 pb-14'>
          <div className='color-disabled mb-14'>Request endpoint</div>
          <div>{action.url || ''}&nbsp;</div>
        </div>
        <div className='border-bottom-grey pl-40 pr-40 pt-14 pb-14'>
          <div className='color-disabled mb-14'>Request method</div>
          <div>{action.method || ''}&nbsp;</div>
        </div>
        <div>
          <div className='d-flex pl-40 pr-40 border-bottom-grey'>
            <div className='flex-grow-1 flex-basis-0 color-disabled pt-14 pb-14'>Key</div>
            <div className='flex-grow-1 flex-basis-0 color-disabled pl-14 pt-14 pb-14'>Value</div>
          </div>
          {
            (action.keyValPair || [['', '']]).map(([key, value], i) => (
              <div className='d-flex pl-40 pr-40 border-bottom-grey'>
                <div className='flex-grow-1 flex-basis-0 pt-27 pb-27'>{key || '--'}</div>
                <div className='flex-grow-1 flex-basis-0 pl-14 pt-27 pb-27'>{value || '--'}</div>
              </div>
            ))
          }
        </div>
        <div className='pl-40 pr-40 pt-14 pb-14'>
          <div className='color-disabled mb-14'>Request Body</div>
          <div>{action.body || ''}&nbsp;</div>
        </div>
      </>
      }
    </div>
  );
}

export default HttpActionDetail;
