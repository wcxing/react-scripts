import {post} from './request';
import {API} from './constant';

export const testRequest = () => {
    return post(
        API.USER_LIST,
        {test: 'test'}
    );
};
