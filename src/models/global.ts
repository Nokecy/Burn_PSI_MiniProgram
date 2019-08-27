import { DvaModelBuilder, actionCreatorFactory } from 'dva-model-creator';

const namespce = "global"

const actionCreator = actionCreatorFactory(namespce);

export interface Counter {
    number: number;
}

const model = new DvaModelBuilder<Counter>({ number: 0 }, namespce)

    .build();

export default model;
export const actions = {
}