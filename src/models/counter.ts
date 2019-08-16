import { DvaModelBuilder, actionCreatorFactory } from 'dva-model-creator';

const actionCreator = actionCreatorFactory("counter");
const add = actionCreator<number>('add');
const minus = actionCreator<number>('minus');
const asyncAdd = actionCreator<number>('asyncAdd');
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export interface Counter {
    number: number;
}

const model = new DvaModelBuilder<Counter>({ number: 0 }, "counter")
    .case(add, (state, payload) => {
        return {
            number: state.number + payload,
        };
    })
    .case(minus, (state, payload) => {
        return {
            number: state.number - payload,
        };
    })
    .takeEvery(asyncAdd, function* (payload, { call, put }) {
        yield call(delay, 2000);
        yield put(add(payload));
    })
    .build();

export default model;
export const actions = {
    add: add,
    minus: minus,
    asyncAdd: asyncAdd
}