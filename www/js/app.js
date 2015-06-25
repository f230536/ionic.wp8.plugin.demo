// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.services', 'ngCordova'])

.config(function ($compileProvider) {
    //Either first one and second one work.
    //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension|x-wmapp.?):|data:image\//);
    $compileProvider.imgSrcSanitizationWhitelist('CapturedImagesCache/');

})

.run(function ($ionicPlatform, $cordovaStatusbar) {
    function channelHandler(event) {
        // var uri = e.uri;
        // console.log("Load Channel :",uri);
        //This is the uri you need for push notification
        // $("#app-status-ul").append('<li>token: ' + result + '</li>');
        // document.getElementById('app-status-ul').appendChild(document.createElement(result));
        //           console.log("Channel : ", result);
        console.log();
        var uri = event.uri;
        console.log("channelHandler uri: " + uri);

    }
    function errorHandler(error) {
        // document.getElementById('app-status-ul').appendChild(document.createElement(error));
        console.log("Error Handle :", error);
    }
    function onNotificationWP8(e) {

        if (e.type == "toast" && e.jsonContent) {
            pushNotification.showToastNotification(successHandler, errorHandler,
            {
                "Title": e.jsonContent["wp:Text1"],
                "Subtitle": e.jsonContent["wp:Text2"],
                "NavigationUri": e.jsonContent["wp:Param"]
            });
        }

        if (e.type == "raw" && e.jsonContent) {
            alert(e.jsonContent.Body);
        }
    }
    function jsonErrorHandler(error) {
        //document.getElementById('app-status-ul').appendChild(document.createElement(error.code));
        //document.getElementById('app-status-ul').appendChild(document.createElement(error.message));
        console.log("ERROR: ", error.code);
        console.log("ERROR: ", error.message);
    }


    $ionicPlatform.ready(function () {
        $cordovaStatusbar.overlaysWebView(true)

        $cordovaStatusBar.style(1) //Light
        $cordovaStatusBar.style(2) //Black, transulcent
        $cordovaStatusBar.style(3) //Black, opaque
        $cordovaStatusbar.styleColor('black')
        $cordovaStatusbar.styleHex('#FF0000') //red
        $cordovaStatusbar.showStatusBar(true);
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
//        if (window.cordova && window.cordova.plugins.Keyboard) {
        if (window.cordova && window.cordova.plugins.Keyboard && !ionic.Platform.isWindowsPhone()){
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        var pushNotification = window.plugins.pushNotification;

        console.log("Platform : " +device.platform);
        if (device.platform == "Win32NT") {
            pushNotification.register(
                channelHandler,
                errorHandler,
                {
                    "channelName": "123723560",
                    "ecb": "onNotificationWP8",
                    "uccb": "channelHandler",
                    "errcb": "jsonErrorHandler"
                });

        }
        document.getElementById("btngelocation").addEventListener('click', getmylocation, false);
    });
})
.controller('ClipboardCtrl', function($scope, $cordovaClipboard) {

    $scope.copyText = function(value)
    {
        $cordovaClipboard.copy(value).then(
      function () {
          // success
          console.log("Coppy Successful");
      }, function () {
          // error
          console.log("Error Copy");
      });

    }
  

})
.controller('dialogCtrl', function ($scope)
{
   
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log("dialogCtrl : " + navigator.notification);
        function alertDismissed() {
            ;   // do something
        }
        navigator.notification.alert('GOOD MORNING', alertDismissed, 'Dialog Active', 'Done');

    }
})

//.controller('StartCtrl'), function($scope, ionPlatform, $http)
.controller('ActionCtrl', function ($scope,$cordovaActionSheet) {

    console.log("ActionCtrl");

    var options = {
        title: 'HELLO',
        //buttonLabels: ['Share via Facebook', 'Share via Twitter'],
        addCancelButtonWithLabel: 'Cancel',
        //androidEnableCancelButton: true,
        winphoneEnableCancelButton: true,
        //addDestructiveButtonWithLabel: 'Delete it'
    };
    var callback = function (buttonIndex) {
        setTimeout(function () {
            alert('button index clicked: ' + buttonIndex);
        });
    };

    $scope.showActionsheet = function () {
        $cordovaActionSheet.show(options, callback);
    };
    
})



.controller('CameraCtrl', function ($scope, Camera) {
    console.log("CameraCtrl");
   
    $scope.getPhoto = function () {
        Camera.getPicture().then(function (imageURI) {
            console.log(imageURI);
            $scope.lastPhoto = imageURI;
        }, function (err) {
            console.err(err);
        }, {
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false
        });
    };

})
// still trying to move everything to here
.controller('GeoCtrl', function ($scope) {
    console.log("GeoCtrl");
    // Wait for device API libraries to load
    document.addEventListener("deviceready", function () {

        console.log("navigator.geolocation works well");
        var btn = document.getElementById("btngelocation");
        btn.addEventListener('click', $scope.getLocation, false);
    }, false);

    $scope.getLocation = function () {
        navigator.geolocation.watchPosition(onSuccess, onError);
    };
    // The onSuccess method for  Geolocation
    function onSuccess(position) {
        console.log("Current Location: ( "+ position.coords.latitude+ " , "+ position.coords.longitude+ " )");
        //Create a Google MAP
        var myLatLag = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        //Set option for map so that is use latlng center
        var myoptions = { zoom: 14, center: myLatLag, mapTypeId: google.maps.MapTypeId.ROADMAP };

        //google map instance
        var map = new google.maps.Map(document.getElementById("mapCanvas"), myoptions);

        //add marker for our location
        var marker = new google.maps.Marker({ position: myLatLag, map: map });
    };

    // The  Callback use to  receive a PositionError object
    function onError(error) {
        alert('Error Code: ' + error.code + ' Error Message: ' + error.message);
    };
});