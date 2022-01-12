import { createStore } from 'redux';
import reducer, { addActions, toggleActiveStatusById, deleteActionById, IHttpReqAction, ITagAction, nativeActions, swapActions, updateAction } from '../actions';

describe('actions reducer', () => {
  it('Should add new HTTP action on disaptching addAction with http req action payload', () => {
    const store = createStore(reducer);
    store.dispatch(addActions(nativeActions.httpReq));
    expect(store.getState().activeActions).toHaveLength(1);
  });

  it('Should update a HTTP action on dispatching updateAction with http req action payload', () => {
    const store = createStore(reducer);
    store.dispatch(addActions(nativeActions.httpReq))
    expect(store.getState().activeActions).toHaveLength(1);
    store.dispatch(updateAction({ ...store.getState().activeActions[0], url: 'some url' }));
    expect((store.getState().activeActions[0] as IHttpReqAction).url).toBe('some url');
  });

  it('Should add new tag action action on dispatching addAction with tag action payload', () => {
    const store = createStore(reducer);
    store.dispatch(addActions(nativeActions.tag));
    expect(store.getState().activeActions).toHaveLength(1);
  });

  it('Should update a tag action action on dispatching updateAction with tag action payload', () => {
    const store = createStore(reducer);
    store.dispatch(addActions(nativeActions.tag));
    expect(store.getState().activeActions).toHaveLength(1);
    store.dispatch(updateAction({ ...store.getState().activeActions[0], tags: [{ name: 'Tag 1', color: '#000' }] }));
    expect((store.getState().activeActions[0] as ITagAction)?.tags?.[0]?.name).toBe('Tag 1');
  });

  it('Should delete an action on disaptching deleteAction', () => {
    const store = createStore(reducer);
    store.dispatch(addActions(nativeActions.tag));
    expect(store.getState().activeActions).toHaveLength(1);
    store.dispatch(deleteActionById(store.getState().activeActions[0].id));
    expect(store.getState().activeActions).toHaveLength(0);
  });

  it('Should swap order of 2 actions on dispatching swapActions', () => {
    const store = createStore(reducer);
    store.dispatch(addActions(nativeActions.tag));
    store.dispatch(addActions(nativeActions.tag));
    expect(store.getState().activeActions[0].order).toBe(0);
    expect(store.getState().activeActions[1].order).toBe(1);
    store.dispatch(swapActions([store.getState().activeActions[0], store.getState().activeActions[1]]));
    expect(store.getState().activeActions[0].order).toBe(1);
    expect(store.getState().activeActions[1].order).toBe(0);
  });

  it('Should deactivate an action on dispatching deactivate action', () => {
    const store = createStore(reducer);
    store.dispatch(addActions(nativeActions.tag));
    expect(store.getState().activeActions[0].isActive).toBeTruthy();
    store.dispatch(toggleActiveStatusById(store.getState().activeActions[0].id));
    expect(store.getState().activeActions[0].isActive).toBeFalsy();
  });
});

