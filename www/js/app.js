// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.columnistas', {
    url: '/columnas',
    views: {
      'tab-columnas': {
        templateUrl: 'templates/tab-columnas.html',
        controller: 'ColumnasCtrl'
      }
    }
  })
  .state('tab.single-columna',{
    url:'/columnas/:postId',
    views:{
      'tab-columnas':{
        templateUrl:'templates/columna-detail.html',
        controller:'ColumnaDetailCtrl'
      }
    }
  })

  .state('tab.videos', {
      url: '/videos',
      views: {
        'tab-videos': {
          templateUrl: 'templates/tab-videos.html',
          controller: 'VideosCtrl'
        }
      }
    })
    .state('tab.single-video', {
      url: '/videos/:programName',
      views: {
        'tab-videos': {
          templateUrl: 'templates/video-detail.html',
          controller: 'VideoDetailCtrl'
        }
      }
    })

  .state('tab.noticias', {
    url: '/noticias',
    views: {
      'tab-noticias': {
        templateUrl: 'templates/tab-noticias.html',
        controller: 'NoticiasCtrl'
      }
    }
  })
  .state('tab.single-noticias',{
    url:'/noticias/:postId',
    views:{
      'tab-noticias':{
        templateUrl:'templates/tab-single-noticias.html',
        controller:'SingleNoticiasCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/columnas');

})
.config(function($httpProvider, $ionicConfigProvider){
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
});
