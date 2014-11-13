/**
 * Created by sys_buajoku on 11/12/2014.
 */

    'use strict';
    angular.module('ilstu.remoteTest',['ilstu.remotelogging'])
        .config(function($locationProvider){ $locationProvider.html5Mode(true).hashPrefix('!');})
        .config(function($logProvider,ilstuRemoteLoggingProvider){
            $logProvider.debugEnabled(true);
            ilstuRemoteLoggingProvider.$get();
        })
        .run(
        function($log,ilstuRemoteLogging){
            $log.debug("app call debug");
            $log.debug (ilstuRemoteLogging);
        }
    );
