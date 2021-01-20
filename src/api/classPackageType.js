import request from '../utils/request';

export const getInfoList = query => {
    return request({
        url: '/package/getClassPackageTypeList',
        method: 'get',
        params: query
    });
};
export const delInfo = id => {
    return request({
        url: '/package/deleteClassPackageType',
        method: 'get',
        params: {
            "id": id
        }
    });
};
export const insertInfo = data => {
    return request.post('/package/insertClassPackageType', data);
};
export const updateInfo = data => {
    return request.post('/package/updateClassPackageType', data);
};

