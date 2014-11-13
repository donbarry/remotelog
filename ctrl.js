/**
 * Created by sys_buajoku on 11/12/2014.
 */
(function(){
'use strict';
angular.module("ilstu.remoteTest").controller('myNoteCtrl',function($scope,$log) {
    $scope.message = "scope message define";
    $log.debug("ctrl call debug");

});
})();
