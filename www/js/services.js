angular.module('starter.services', [])

/*
.factory('Location', ['$document', '$rootScope', function ($document, $rootScope) {

    document.addEventListener("deviceready", function () {

        console.log("navigator.geolocation works well");
        var btn = document.getElementById("btngelocation");
        btn.addEventListener('click', $scope.getLocation, false);

    }, false);
}])
*/
.factory('$cordovaActionSheet', ['$q', '$window', function ($q, $window) {

    return {
        show: function (options) {
            var q = $q.defer();

            $window.plugins.actionsheet.show(options, function (result) {
                q.resolve(result);
            });

            return q.promise;
        },

        hide: function () {
            return $window.plugins.actionsheet.hide();
        }
    };
}])
.factory('Camera', ['$q', function ($q) {
    console.log("Camera");
    return {
        getPicture: function (options) {
            var q = $q.defer();

            navigator.camera.getPicture(function (result) {
                // Do any magic you need
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            }, options);

            return q.promise;
        }
    }
}])