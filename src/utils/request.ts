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