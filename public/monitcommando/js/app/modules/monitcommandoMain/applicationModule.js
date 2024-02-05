/**
 * http://usejsdoc.org/
 */

var monitcommandoMainModule = angular.module("monitcommandoMainModule", ["ngRoute"]).config(function ($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
});


// I intialize all the stuff that An Angular app needs into these datamembers.
// Then.. The init method acts upon them.  All ${moduleName}.globalAppData should look the same.
// The method rootMainWebapp.js is responsible for calling all init methods of each exported
// module.
monitcommandoMainModule.globalAppData = {
    controllers: {},
    routes: {},
    providers: {},
    factories: {},
    services: {}
};

// Id put this in the structure.. But it's easier to find it's definition like this when Grepping
monitcommandoMainModule.globalAppData.init = function () {
    monitcommandoMainModule.service(monitcommandoMainModule.globalAppData.services);
    monitcommandoMainModule.controller(monitcommandoMainModule.globalAppData.controllers);
    monitcommandoMainModule.config(monitcommandoMainModule.globalAppData.routes);

};





