import { DvaModelBuilder, actionCreatorFactory } from 'dva-model-creator';
import { TokenAuthServiceProxy, AuthenticateResultModel } from "../../services/service-proxies";
import IAuthenticateResult from "../../types/authenticate";
import Taro from '@tarojs/taro';
const nameSpace = "login"

const actionCreator = actionCreatorFactory(nameSpace);
const authenticate = actionCreator<{ userName: string, password: string }>('authenticate');

export interface LoginState {
}

const model = new DvaModelBuilder<LoginState>({ number: 0 }, nameSpace)

    .takeEvery(authenticate, function* (payload, { }) {
        let queryModel: any = {
            userNameOrEmailAddress: payload.userName, password: payload.password,
            rememberClient: true
        };
        const token: AuthenticateResultModel = yield new TokenAuthServiceProxy().authenticate(queryModel);

        Taro.setStorageSync('token', token.accessToken!);

        Taro.switchTab({ url: '/pages/home/index' });
    })
    .build();

export default model;
export const actions = {
    authenticate: authenticate
}