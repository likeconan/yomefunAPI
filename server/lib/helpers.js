module.exports = {
    setupRoutes: setupRoutes,
    excludeRoutes: excludeRoutes,
    loginRole: loginRole,
}

function setupRoutes(server, lib) {
    for (controller in lib.controllers) {
        cont = new lib.controllers[controller](lib)
        cont.setUpActions(server)
    }
}

function excludeRoutes(routename) {
    if (routename.indexOf('ignore') >= 0) {
        return true;
    } else {
        return false;
    }
}

function loginRole(role, from) {
    var obj = {
        superAdmin: ['client_mobile', 'portal'],
        generalUser: ['client_mobile']
    }
    return obj[role].indexOf(from) >= 0;
}