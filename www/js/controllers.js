angular.module('starter.controllers', [])

.controller('ColumnasCtrl', function($scope,$http,Columnas) {
  var columnas = Columnas.all();
  columnas.then(function(data){
    console.log(data);
  })
})

.controller('VideosCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('VideoDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('NoticiasCtrl', function($scope,Noticias) {
  $scope.posts = [];
  var reqNoticias = Noticias.all();
  reqNoticias.then(function(data){
    $scope.posts = data.data.posts;
  })
});
