const ADD_ACTION = 'ADD_ACTION';
const UPDATE_ACTION = 'UPDATE_ACTION';
const DELETE_ACTION_BY_ID = 'DELETE_ACTION_BY_ID';
const SWAP_ACTIONS = 'SWAP_ACTIONS';
const DEACTIVATE_ACTION = 'DEACTIVATE_ACTION';


/**
 * Action creator for adding an action
 * @param payload action to be added
 * @returns {IAddAction}
 */
export const addAction = (payload: ActiveActionType): IAddAction => ({
  type: ADD_ACTION,
  payload
});

/**
 * Action creator for update an action
 * @param payload updated data of an action
 * @returns {IUpdateAction}
 */
export const updateAction = (payload: ActiveActionType): IUpdateAction => ({
  type: UPDATE_ACTION,
  payload
});


/**
 * Action creator for delete actions
 * @param payload id of action to be deleted
 * @returns {IDeleteAction}
 */
export const deleteActionById = (payload: number): IDeleteAction => ({
  type: DELETE_ACTION_BY_ID,
  payload
});

/**
 * Action creator for swap actions
 * @param payload array of 2 actionsfor the swap
 * @returns {ISwapActions}
 */
export const swapActions = (payload: [ActiveActionType, ActiveActionType]): ISwapActions => ({
  type: SWAP_ACTIONS,
  payload
});

/**
 * Action creator for deactivate action
 * @param payload id of the action to be deactivated
 * @returns {IDeactivateAction}
 */
export const deactivateActionById = (payload: number): IDeactivateAction => ({
  type: DEACTIVATE_ACTION,
  payload
});

interface IAddAction {
  type: typeof ADD_ACTION,
  payload: ActiveActionType;
}

interface IUpdateAction {
  type: typeof UPDATE_ACTION,
  payload: ActiveActionType;
}

interface IDeleteAction {
  type: typeof DELETE_ACTION_BY_ID,
  payload: number;
}

interface ISwapActions {
  type: typeof SWAP_ACTIONS,
  payload: [ActiveActionType, ActiveActionType]
}

interface IDeactivateAction {
  type: typeof DEACTIVATE_ACTION,
  payload: number;
}

type ReducerActionType = IAddAction | IUpdateAction | IDeleteAction | ISwapActions | IDeactivateAction;

interface IAction {
  readonly name: string;
  readonly iconClassName: string;
}

interface IActiveAction extends IAction {
  id: number;
  order: number;
  isActive: boolean;
}

interface ITag {
  readonly name: string;
  readonly color: string;
}

export interface ITagAction extends IActiveAction {
  tags: ITag[];
}

export interface IHttpReqAction extends IActiveAction {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
}

type ActiveActionType = ITagAction | IHttpReqAction;

interface IActionState {
  allActions: IAction[];
  activeActions: ActiveActionType[];
}

const actions = {
  tag: { name: 'Add Tag', iconClassName: 'tag' },
  httpReq: { name: 'HTTP Request', iconClassName: 'tag' },
};

const allActions = Object.values(actions);

const initialState: IActionState = {
  allActions,
  activeActions: []
};

const reducer = (state: IActionState = initialState, action: ReducerActionType): IActionState => {
  switch (action.type) {
    case ADD_ACTION:
      return {
        ...state,
        activeActions: [...state.activeActions, action.payload]
      }
    case UPDATE_ACTION:
      return {
        ...state,
        activeActions: [...state.activeActions.filter(({ id }) => id !== action.payload.id), action.payload]
      }
    case SWAP_ACTIONS:
      return {
        ...state,
        activeActions: state.activeActions.map((currentAction) => {
          if (currentAction.id === action.payload[0].id) {
            return { ...currentAction, order: action.payload[1].order };
          } else if (currentAction.id === action.payload[1].id) {
            return { ...currentAction, order: action.payload[0].order };
          }
          return currentAction;
        })
      }
    case DELETE_ACTION_BY_ID:
      return {
        ...state,
        activeActions: [...state.activeActions.filter(({ id }) => id !== action.payload)]
      }
    case DEACTIVATE_ACTION:
      return {
        ...state,
        activeActions: state.activeActions.map((currentAction) => currentAction.id === action.payload ? { ...currentAction, isActive: false } : currentAction)
      };
    default:
      return state;
  }
}

export default reducer;

/**
 * Creator for action of type http req action
 * @param data 
 * @returns 
 */
export const createHttpReqAction = (data: Omit<IHttpReqAction, keyof IAction | 'isActive'>): IHttpReqAction => ({
  ...actions.httpReq, ...data, isActive: true
});

/**
 * Creator for action of type tag action
 * @param data 
 * @returns 
 */
export const createTagAction = (data: Omit<ITagAction, keyof IAction | 'isActive'>): ITagAction => ({
  ...actions.tag, ...data, isActive: true
});
