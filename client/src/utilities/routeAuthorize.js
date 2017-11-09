import store from '../store';
import browserHistory from 'react-router/lib/browserHistory';
export function routeAuthorize(path) {
    const { loggedUser } = store.getState().userAuthReducer
    var res = ''
    if (loggedUser.isAuthorize) {
        if (path.indexOf('/login') >= 0) {
            res = '/';
        } else {
            //need to do with other pages in different roles
        }
    } else {
        res = '/login'
    }
    if (res) {
        browserHistory.push(res)
    }
}