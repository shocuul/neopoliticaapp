angular.module('starter.controllers', [])

.controller('ColumnasCtrl', function($scope,$http,Columnas,ColumasProvider,$ionicScrollDelegate) {
  $scope.columnas = [];
  $scope.hidespinner = false;

  $scope.isFirst = function(){
    if(Columnas.currentPage()===1){
      return true;
    }else{
      return false;
    }
  }
  $scope.lastPage = function(){
    if(Columnas.currentPage() === Columnas.maxPage()){
      return true;
    }else{
      return false;
    }
  }
  $scope.siguiente = function(){
    $scope.hidespinner = false;
    $ionicScrollDelegate.scrollTop();
    $scope.columnas = [];
    Columnas.setPage(Columnas.currentPage()-1);
    Columnas.all().then(function(columnas){
      $scope.columnas = columnas;
      $scope.hidespinner = true;
    })
  }

  $scope.anterior = function(){
    $scope.hidespinner = false;
    $ionicScrollDelegate.scrollTop();
    $scope.columnas = [];
    Columnas.setPage(Columnas.currentPage()+1);
    Columnas.all().then(function(columnas){
      $scope.columnas = columnas;
      $scope.hidespinner = true;
    })
  }
  Columnas.all().then(function(columnas){
    $scope.columnas = columnas;
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

  //https://api.ustream.tv/channels/8317831/videos.json

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

.controller('VideoDetailCtrl', function($scope, $stateParams, Chats, $http, $sce) {
  //console.log($stateParams.programName);
  $scope.videos = [];

  $scope.converteUrlYoutube = function(url){
    var string = ""+url;
    var replace = string.replace("watch?v=","embed/");
    var iframehtml = $sce.trustAsHtml('<iframe width="200" height="150" src="'+replace+'" frameborder="0" allowfullscreen></iframe>');
    console.log(iframehtml)
    return iframehtml;
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

.controller('NoticiasCtrl', function($scope,Noticias,$ionicScrollDelegate) {
  $scope.posts = [];
  $scope.hidespinner = false;

  $scope.isFirst = function(){
    if(Noticias.currentPage()===1){
      return true;
    }else{
      return false;
    }
  }
  $scope.lastPage = function(){
    if(Noticias.currentPage() === Noticias.maxPage()){
      return true;
    }else{
      return false;
    }
  }

  $scope.siguiente = function(){
    $scope.hidespinner = false;
    $ionicScrollDelegate.scrollTop();
    $scope.posts = [];
    Noticias.setPage(Noticias.currentPage()-1);
    Noticias.all().then(function(posts){
      $scope.posts = posts;
      $scope.hidespinner = true;
    })
  }

  $scope.anterior = function(){
    $scope.hidespinner = false;
    $ionicScrollDelegate.scrollTop();
    $scope.posts = [];
    //console.log(Noticias.currentPage());
    Noticias.setPage(Noticias.currentPage()+1);

    Noticias.all().then(function(posts){
      $scope.posts = posts;
      // $scope.hidespinner = true;
      $scope.hidespinner = true;
      //console.log(Noticias.currentPage);
    })
  }
  Noticias.all().then(function(posts){
    //console.log(posts);
    $scope.posts = posts;
    $scope.hidespinner = true;
  });
  // var reqNoticias = Noticias.promise;
  // reqNoticias.then(function(data){
  //   $scope.hidespinner = true;
  // })
});
