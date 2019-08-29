import moment from 'moment';
import Taro, { request } from '@tarojs/taro';
import { HOST } from "../config/index";
class ClientBase {
    protected getBaseUrl(defaultUrl: string, baseUrl?: string) {
        return HOST;//baseUrl ? baseUrl : defaultUrl;
    }

    protected transformOptions(request: request.Param) {
        let token = Taro.getStorageSync('token');
        request.header["Authorization"] = "Bearer " + token;
        return Promise.resolve(request);
    }
}