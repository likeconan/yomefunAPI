import UserConstant from '../constants/user.constant';
import api from '../utilities/api';
import storage from 'store2'
import browserHistory from 'react-router/lib/browserHistory'


export function authorize() {
    return new Promise((resolve, reject) => {
        api({
            url: '/users/authorize'
        }).then((data) => {
            resolve({
                type: UserConstant.USER_AUTHORIZE,
                payload: data
            })
        }).catch(() => {
            resolve({
                type: UserConstant.USER_AUTHORIZE,
                payload: {
                    isAuthorize: false
                }
            })
        })
    })
}

export function login(obj) {
    return new Promise((resolve, reject) => {
        api({
            url: '/users',
            params: obj
        }).then((data) => {
            resolve({
                type: UserConstant.USER_LOGIN,
                payload: data.user
            })
            storage.local({ authorize: data.token })
        })
    })
}