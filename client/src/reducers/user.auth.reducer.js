import UserConstant from '../constants/user.constant';

export default function reducer(state = {
    loggedUser: {}
}, action) {
    switch (action.type) {
        case UserConstant.USER_AUTHORIZE:
            return {
                ...state,
                loggedUser: action.payload
            };
        case UserConstant.USER_LOGIN:
            return {
                ...state,
                loggedUser: action.payload
            };
        default:
            return state;
    }
}