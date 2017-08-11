module.exports = {
    setupRoutes: setupRoutes,
    excludeRoutes: excludeRoutes,
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