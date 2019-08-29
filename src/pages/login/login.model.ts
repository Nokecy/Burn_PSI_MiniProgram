import { DvaModelBuilder, actionCreatorFactory } from 'dva-model-creator';
import { TokenAuthServiceProxy, AuthenticateResultModel } from "../../services/service-proxies";
import { actions as globalActions } from "../../models/global";
import Taro from '@tarojs/taro';
const nameSpace = "login"

const actionCreator = actionCreatorFactory(nameSpace);
const authenticate = actionCreator<{ userName: string, password: string }>('authenticate');

export interface LoginState {
}

const model = new DvaModelBuilder<LoginState>({ number: 0 }, nameSpace)

    .takeEvery(authenticate, function* (payload, { put }) {
        let queryModel: any = {
            userNameOrEmailAddress: payload.userName, password: payload.password,
            rememberClient: true
        };
        const token: AuthenticateResultModel = yield new TokenAuthServiceProxy().authenticate(queryModel);

        Taro.setStorageSync('token', token.accessToken!);

        yield put(globalActions.loadConfiguration());
    })
    .build();

export default model;
export const actions = {
    authenticate: authenticate
}