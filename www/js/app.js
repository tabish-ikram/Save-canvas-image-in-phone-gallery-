// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

  .controller('overlayController',function($scope, $timeout){

    var startimg="img/ionic.png";
    $scope.image=startimg;
    $scope.textOverlay="";

    var canvas = document.getElementById('tempCanvas');
    var context = canvas.getContext('2d');

    $scope.createOverlay= function(){

      var source =  new Image();
      source.src = startimg;
      canvas.width = source.width;
      canvas.height = source.height;

      console.log(canvas);

      context.drawImage(source,0,0);

      context.font = "100px impact";
      textWidth = context.measureText($scope.frase).width;

      if (textWidth > canvas.offsetWidth) {
        context.font = "40px impact";
      }
      context.textAlign = 'center';
      context.fillStyle = 'white';

      context.fillText($scope.textOverlay,canvas.width/2,canvas.height*0.8);

      var imgURI = canvas.toDataURL();

      $timeout( function(){
        $scope.image = imgURI;
      }, 200);
    }

    $scope.saveImage = function(){
      window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
          console.log(msg);
        },
        function(err){
          console.log(err);
        },
        document.getElementById('tempCanvas')
      );
    }

  })
