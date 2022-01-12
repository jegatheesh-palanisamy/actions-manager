const ADD_ACTION = 'ADD_ACTION';
const UPDATE_ACTION = 'UPDATE_ACTION';
const DELETE_ACTION_BY_ID = 'DELETE_ACTION_BY_ID';
const SWAP_ACTIONS = 'SWAP_ACTIONS';
const TOGGLE_ISACTIVE_STATUS = 'TOGGLE_ISACTIVE_STATUS';
const CHANGE_VIEW = 'CHANGE_VIEW';
const SELECT_ACTION = 'SELECT_ACTION';

/**
 * Action creator for adding an action
 * @param payload action to be added
 * @returns {IAddAction}
 */
export const addActions = (payload: IAction | IAction[]): IAddAction => ({
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
 * Action creator for toggle the isActive status of an action
 * @param payload id of the action to be toggled
 * @returns {IToggleIsActiveAction}
 */
export const toggleActiveStatusById = (payload: number): IToggleIsActiveAction => ({
  type: TOGGLE_ISACTIVE_STATUS,
  payload
});

/**
 * Action creator for changing view
 * @param payload 
 * @returns 
 */
export const changeView = (payload: typeof views[keyof typeof views]): IChangeView => ({
  type: CHANGE_VIEW,
  payload
})

/**
 * Action creator for changing view
 * @param payload 
 * @returns 
 */
export const selectAction = (payload: ActiveActionType): ISelectAction => ({
  type: SELECT_ACTION,
  payload
})

interface IAddAction {
  type: typeof ADD_ACTION,
  payload: IAction | IAction[];
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

interface IToggleIsActiveAction {
  type: typeof TOGGLE_ISACTIVE_STATUS,
  payload: number;
}

interface IChangeView {
  type: typeof CHANGE_VIEW;
  payload: typeof views[keyof typeof views]
}

interface ISelectAction {
  type: typeof SELECT_ACTION;
  payload: ActiveActionType;
}



type ReducerActionType = IAddAction | IUpdateAction | IDeleteAction | ISwapActions | IToggleIsActiveAction | IChangeView | ISelectAction;

export interface IAction {
  readonly name: string;
  readonly icon: string;
}

interface IActiveAction extends IAction {
  id: number;
  order: number;
  isActive: boolean;
  updatedAt?: number;
}

interface ITag {
  readonly name: string;
  readonly color: string;
}

export interface ITagAction extends IActiveAction {
  tags?: ITag[];
}

export interface IHttpReqAction extends IActiveAction {
  url?: string;
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  body?: string;
  keyValPair?: [string, string][]
}

export type ActiveActionType = ITagAction | IHttpReqAction;

export interface IActionState {
  activeActions: ActiveActionType[];
  view: typeof views[keyof typeof views];
  selectedAction: null | ActiveActionType;
}

export const views = {
  actionsSelector: 'actions-selector',
  activeActions: 'actions',
  configureAction: 'action-config'
}

export const nativeActions = {
  tag: { name: 'Tag customer', icon: 'fas fa-tag' },
  httpReq: { name: 'Make HTTP Request', icon: 'fas fa-exchange-alt' },
};

const initialState: IActionState = {
  activeActions: [],
  view: 'actions',
  selectedAction: null
};

const reducer = (state: IActionState = initialState, action: ReducerActionType): IActionState => {
  switch (action.type) {
    case ADD_ACTION:
      return {
        ...state,
        activeActions: [
          ...state.activeActions,
          ...(action.payload instanceof Array ? action.payload.map((data, i) => constructActionObj(data, state.activeActions.length + i))
            : [constructActionObj(action.payload, state.activeActions.length)])
        ]
      }
    case UPDATE_ACTION:
      return {
        ...state,
        activeActions: [...state.activeActions.filter(({ id }) => id !== action.payload.id), { ...action.payload, updatedAt: new Date().getTime() }]
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
    case TOGGLE_ISACTIVE_STATUS:
      return {
        ...state,
        activeActions: state.activeActions.map((currentAction) => currentAction.id === action.payload ? { ...currentAction, isActive: !currentAction.isActive } : currentAction)
      };
    case CHANGE_VIEW:
      return {
        ...state,
        view: action.payload
      };
    case SELECT_ACTION:
      return {
        ...state,
        selectedAction: action.payload
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
export const createHttpReqAction = (data: IAction, existingActionsLength: number): IHttpReqAction => ({
  ...nativeActions.httpReq, ...data, isActive: true, id: existingActionsLength, order: existingActionsLength
});

/**
 * Creator for action of type tag action
 * @param data 
 * @returns 
 */
export const createTagAction = (data: IAction, existingActionsLength: number): ITagAction => ({
  ...nativeActions.tag, ...data, isActive: true, tags: [], id: existingActionsLength, order: existingActionsLength
});

/**
 * 
 * @param action 
 * @param existingActionsLength 
 * @returns 
 */
export const constructActionObj = (action: IAction, existingActionsLength: number): ActiveActionType => {
  switch (action.name) {
    case nativeActions.tag.name:
      return createTagAction(action, existingActionsLength);
    case nativeActions.httpReq.name:
    default:
      return createHttpReqAction(action, existingActionsLength);
  }
}