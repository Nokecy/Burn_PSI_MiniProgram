import moment from 'moment';
import Taro, { request } from '@tarojs/taro';

class ClientBase {
    protected getBaseUrl(defaultUrl: string, baseUrl?: string) {
        return baseUrl ? baseUrl : defaultUrl;
    }
}