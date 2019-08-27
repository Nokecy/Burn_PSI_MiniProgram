import Taro, { request } from '@tarojs/taro';
import { HOST } from "../config/index";

export default <T = any, U = any>(OBJECT: request.Param<U>): Promise<request.Promised<T>> => {
    return Taro.request({
        ...OBJECT,
        url: HOST + OBJECT.url
    }).then((res) => {
        const { statusCode, data } = res;
        if (statusCode >= 200 && statusCode < 300) {
            return data;
        } else {
            throw new Error(`网络请求错误，状态码${statusCode}`);
        }
    }).catch((error) => {
        throw error;
    });
}

export const Fetch = (url: string, options_: RequestInit) => {
    return Taro.request({
        url: url,
        header: options_.headers,
        method: options_.method,
        data: options_.body
    }).then(_res => {
        return _res.
    });
}