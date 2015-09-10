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

.controller('ColumnaDetailCtrl', function($scope,$stateParams,Columnas){
  $scope.columna = Columnas.getPost($stateParams.postId);
})

.controller('VideosCtrl', function($scope, Chats,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.programs = [];
  (function(){
     buildListaProgramas();
  }());

  function buildListaProgramas(){
    $http.get('https://api.ustream.tv/channels/8317831.json').then(function(response){
      console.log(response.data);
    })
  }

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('VideoDetailCtrl', function($scope, $stateParams, Chats, $http) {
  //console.log($stateParams.programName);
  $scope.videos = [];

  $scope.converteUrlYoutube = function(url){
    var replace = url.replace("watch?v","embed/");
    return '<iframe width="560" height="315" src="'+replace+'" frameborder="0" allowfullscreen></iframe>';
  }

  switch ($stateParams.programName) {
    case 'fz10':
      $scope.name = 'FZ10';
      $http.get('http://neopoliticatv.org/category/programacion/fz10/?json=1').then(function(response){
        $scope.videos = response.data.posts;
      })
      break;
    case 'np-noticias':
      $scope.name = 'NP Noticias';
      $http.get('http://neopoliticatv.org/category/programacion/np-noticias/?json=1').then(function(response){
        $scope.videos = response.data.posts;
      })
      break;
    default:
  }

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
