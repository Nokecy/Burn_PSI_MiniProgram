import { DvaModelBuilder, actionCreatorFactory } from 'dva-model-creator';
const namespace = "category";

export interface CategoryProps {
    list?: []
}

const actionCreator = actionCreatorFactory(namespace);
const updateState = actionCreator<CategoryProps>('updateState');
const query = actionCreator('query');

const model = new DvaModelBuilder<CategoryProps>({ list: [] }, namespace)
    .case(updateState, (state, payload) => {
        return { ...state, ...payload };
    })
    .takeEvery(query, function* (payload, { }) {

    })
    .build();

export default model;
export const actions = {
    updateState: updateState,
    query: query
}