import { DvaModelBuilder, actionCreatorFactory } from 'dva-model-creator';
import request from "../../utils/request";
import IAuthenticateResult from "../../types/authenticate";
import Taro from '@tarojs/taro';
const nameSpace = "login"

const actionCreator = actionCreatorFactory(nameSpace);
const authenticate = actionCreator<{ userName: string, password: string }>('authenticate');

export interface LoginState {
}

const model = new DvaModelBuilder<LoginState>({ number: 0 }, nameSpace)

    .takeEvery(authenticate, function* (payload, { }) {
        const result: IAuthenticateResult = yield request({
            url: '/api/TokenAuth/Authenticate',
            method: "POST",
            data: {
                "userNameOrEmailAddress": payload.userName,
                "password": payload.password,
                "rememberClient": true
            }
        });
        Taro.setStorageSync('token', result.accessToken!);

        Taro.navigateTo({ url: '/pages/home/index' });
    })
    .build();

export default model;
export const actions = {
    authenticate: authenticate
}