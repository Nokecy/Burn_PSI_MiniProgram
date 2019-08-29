import moment from 'moment';
import Taro, { request } from '@tarojs/taro';

class ClientBase {
    protected getBaseUrl(defaultUrl: string, baseUrl?: string) {
        return baseUrl ? baseUrl : defaultUrl;
    }

    protected transformOptions(request: request.Param) {
        let token = Taro.getStorageSync('token');
        request.header["Authorization"] = "Bearer " + token;
        return Promise.resolve(request);
    }
}