import { createStore } from 'redux';
import reducer, { addAction, createHttpReqAction, createTagAction, deactivateActionById, deleteActionById, IHttpReqAction, ITagAction, swapActions, updateAction } from '../actions';

describe('actions reducer', () => {
  it('Should add new HTTP action on disaptching addAction with http req action payload', () => {
    const store = createStore(reducer);
    store.dispatch(addAction(createHttpReqAction({ id: 0, url: '', method: 'GET', order: 0 })))
    expect(store.getState().activeActions).toHaveLength(1);
  });

  it('Should update a HTTP action on dispatching updateAction with http req action payload', () => {
    const store = createStore(reducer);
    const action = createHttpReqAction({ id: 0, url: '', method: 'GET', order: 0 });
    store.dispatch(addAction(action))
    expect(store.getState().activeActions).toHaveLength(1);
    store.dispatch(updateAction({ ...store.getState().activeActions[0], url: 'some url' }));
    expect((store.getState().activeActions[0] as IHttpReqAction).url).toBe('some url');
  });

  it('Should add new tag action action on dispatching addAction with tag action payload', () => {
    const store = createStore(reducer);
    store.dispatch(addAction(createTagAction({ id: 0, tags: [], order: 0 })));
    expect(store.getState().activeActions).toHaveLength(1);
  });

  it('Should update a tag action action on dispatching updateAction with tag action payload', () => {
    const store = createStore(reducer);
    const action = createTagAction({ id: 0, tags: [], order: 0 });
    store.dispatch(addAction(action));
    expect(store.getState().activeActions).toHaveLength(1);
    store.dispatch(updateAction({ ...store.getState().activeActions[0], tags: [{ name: 'Tag 1', color: '#000' }] }));
    expect((store.getState().activeActions[0] as ITagAction).tags[0].name).toBe('Tag 1');
  });

  it('Should delete an action on disaptching deleteAction', () => {
    const store = createStore(reducer);
    const action = createTagAction({ id: 0, tags: [], order: 0 });
    store.dispatch(addAction(action));
    expect(store.getState().activeActions).toHaveLength(1);
    store.dispatch(deleteActionById(store.getState().activeActions[0].id));
    expect(store.getState().activeActions).toHaveLength(0);
  });

  it('Should swap order of 2 actions on dispatching swapActions', () => {
    const store = createStore(reducer);
    const actionA = createTagAction({ id: 0, tags: [], order: 0 });
    const actionB = createHttpReqAction({ id: 1, url: '', method: 'GET', order: 1 });
    store.dispatch(addAction(actionA));
    store.dispatch(addAction(actionB));
    expect(store.getState().activeActions[0].order).toBe(0);
    expect(store.getState().activeActions[1].order).toBe(1);
    store.dispatch(swapActions([store.getState().activeActions[0], store.getState().activeActions[1]]));
    console.log(store.getState());
    expect(store.getState().activeActions[0].order).toBe(1);
    expect(store.getState().activeActions[1].order).toBe(0);
  });

  it('Should deactivate an action on dispatching deactivate action', () => {
    const store = createStore(reducer);
    const action = createTagAction({ id: 0, tags: [], order: 0 });
    store.dispatch(addAction(action));
    expect(store.getState().activeActions[0].isActive).toBeTruthy();
    store.dispatch(deactivateActionById(store.getState().activeActions[0].id));
    expect(store.getState().activeActions[0].isActive).toBeFalsy();
  });
});

