import { DvaModelBuilder, actionCreatorFactory } from 'dva-model-creator';
import { AbpApplicationConfigurationServiceProxy, ApplicationConfigurationDto } from "../services/service-proxies";
import Taro from '@tarojs/taro';
const namespce = "global"
export interface Global {
    configuration?: ApplicationConfigurationDto;
}

const actionCreator = actionCreatorFactory(namespce);
const updateState = actionCreator<Global>('updateState');
const loadConfiguration = actionCreator('loadConfiguration');


const model = new DvaModelBuilder<Global>({ configuration: undefined }, namespce)
    .case(updateState, (state, payload) => {
        return { ...state, ...payload };
    })

    .takeEvery(loadConfiguration, function* (_payload, { put }) {
        let service = new AbpApplicationConfigurationServiceProxy();
        const configuration: ApplicationConfigurationDto = yield service.get();
        yield put(updateState({ configuration: configuration }));
        Taro.switchTab({
            url: '/pages/home/index'
        })
    })

    .build();

export default model;
export const actions = {
    updateState: updateState,
    loadConfiguration: loadConfiguration
}