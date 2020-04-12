/**
 * @file HTTP 请求统一处理
 */

import axios from 'axios';
import {camelCaseObject} from '~/util/string';

export const get = (url, data) => {
    return axios.get(
        url,
        {
            params: data
        }
    )
        .then(res => {
            res.data = camelCaseObject(res.data);
            return res;
        });
};

export const post = (url, data) => {
    return axios.post(
        url,
        data
    )
        .then(res => {
            res.data = camelCaseObject(res.data);
            return res;
        });
};
