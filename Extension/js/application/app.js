//popup.js test
// window.onload = function() {
//     console.log("popup.js test, window.onload");
//     document.getElementById("red").onclick = function() {
//         console.log('getElementById("red").onclick');
//         chrome.runtime.sendMessage({
//             type: 'red-divs'
//         });
//     };
//     document.getElementById("blue").onclick = function() {
//         console.log('getElementById("blue").onclick')
//         chrome.runtime.sendMessage({
//             type: 'blue-divs'
//         });
//     };
// }

// window.onload = function() {
//     var port = chrome.extension.connect({name: "newport"});
//     document.getElementById("red").onclick = function() {
//         port.postMessage({ type: "red-divs" });
//     }
//     document.getElementById("blue").onclick = function() {
//         port.postMessage({ type: "blue-divs" });
//     }
//     port.onMessage.addListener(function (message) {
//         console.log("message is", message);
//     });
// }
// end of popup.js test


var app = angular.module('QuestackularExt', ['ui.router', 'ui.bootstrap']);

app.controller('extCont', function($scope, UserFactory, $state) {
    $scope.login = function() {
        window.open('localhost:1337/auth/google', '_blank');
    };
    
    var getName = function(){
        UserFactory.getUserInfo().then(function(data){
            $scope.name = data.user.google.name;
            $scope.loggedIn = true;  
        });
       
    };
    getName();
});

app.value("chromeExtId", "plokhpdlfcefknfoaicekkibijgedofn");

app.config(function ($urlRouterProvider, $locationProvider, $compileProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');


    // whitelist the chrome-extension: protocol 
    // so that it does not add "unsafe:"   
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
});