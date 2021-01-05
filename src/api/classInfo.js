import request from '../utils/request';

export const getClassInfoList = query => {
    return request({
        url: '/class/getClassInfoList',
        method: 'get',
        params: query
    });
};
export const deleteClassInfo = del => {
    return request({
        url: '/class/deleteClassInfo',
        method: 'get',
        params: {
            "classId": del
        }
    });
};
export const insertClassInfo = insert => {
    return request.post('/class/insertClassInfo', insert);
};
export const updateClassInfo = insert => {
    return request.post('/class/updateClassInfo', insert);
};

