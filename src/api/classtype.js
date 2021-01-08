import request from '../utils/request';

export const getClassTypeList = query => {
    return request({
        url: '/class/getClassTypeList',
        method: 'get',
        params: query
    });
};
export const deleteClassType = del => {
    return request({
        url: '/class/deleteClassType',
        method: 'get',
        params: {
            "classTypeId": del
        }
    });
};
export const insertClassType = insert => {
    return request.post('/class/insertClassType', insert);
};
export const updateClassType = update => {
    return request.post('/class/updateClassType', update);
};

export const getAllClassTypeList = () => {
    return request({
        url: '/class/getAllClassTypeList',
        method: 'get'
    });
};

