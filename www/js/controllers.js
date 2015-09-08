angular.module('starter.controllers', [])

.controller('ColumnasCtrl', function($scope,$http,Columnas,ColumasProvider) {
  $scope.columnas = [];
  $scope.hidespinner = false;
  var columnas = Columnas.all();
  columnas.then(function(data){
    $scope.columnas = data.data.posts;
    $scope.hidespinner = true;
  })

  $scope.getName = function(slug){
    return ColumasProvider.getEditor(slug);
  }
  $scope.getImageBackground = function(slug){
    return ColumasProvider.getBackground(slug);
  }
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

.controller('SingleNoticiasCtrl',function($scope,$stateParams,Noticias){
  $scope.post = Noticias.getPost($stateParams.postId);
})

.controller('NoticiasCtrl', function($scope,Noticias) {
  $scope.posts = [];
  $scope.hidespinner = false;
  var reqNoticias = Noticias.all();
  reqNoticias.then(function(data){
    $scope.posts = data.data.posts;
    $scope.hidespinner = true;
  })
});
