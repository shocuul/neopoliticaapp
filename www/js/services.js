angular.module('starter.services', [])

.factory('Videos',function($http){
  var fz10 = [];
  var npnoticias = [];
  //https://api.ustream.tv/channels/8317831/videos.json
  //https://api.ustream.tv/channels/8317831.json
  return {
    loadVideos:function(){
      return $http.get('https://api.ustream.tv/channels/8317831/videos.json').then(function(response){
        for (var i = 0; i < response.data.videos.length; i++) {
          if(response.data.videos[i].title.indexOf('FZ10') >= 0){
            fz10.push(response.data.videos[i]);
          }else if(response.data.videos[i].title.indexOf('Noticias') >= 0)
            npnoticias.push(response.data.videos[i]);
        }
      })
    },
    getFZ10Videos:function(){
      return fz10;
    },
    getNPNoticiasVideos:function(){
      return npnoticias;
    }
  }
})

.factory('Columnas', function($http){
  var columnas = [];
  var currentPage = 1;
  var maxPage = null;
  var urlPage = 'http://neopoliticatv.org/category/columnistas/page/'+currentPage+'?json=1';
  function buildUrl(){
    urlPage = 'http://neopoliticatv.org/category/columnistas/page/'+currentPage+'?json=1';
    console.log(urlPage);
  }
  return {
    currentPage:function(){
      return currentPage;
    },
    maxPage:function(){
      return this.maxPage;
    },
    all:function(){
      buildUrl();
      console.log(urlPage);
      return $http.get(urlPage).then(function(response){
        console.log(response);
        columnas = response.data.posts;
        this.maxPage = response.data.pages;
        console.log(columnas)
        return columnas;
      })
    },
    setPage:function(page){
      columnas = [];
      currentPage = page;
      console.log(currentPage);
    },
    getPost:function(postId){
      for(i=0;i<columnas.length;i++){
        if(columnas[i].id === parseInt(postId)){
          return columnas[i];
        }
      }
      return null;
    }
  }
})

.factory('Noticias',function($http){
  var posts = [];
  var currentPage = 1;
  var maxPage = null;
  var urlPage = 'http://neopoliticatv.org/category/noticias/page/'+currentPage+'?json=1';
  // function downloadData(){
  //   self.promise = $http.get(urlPage);
  //   promise.then(function(response){
  //     posts = response.data.posts;
  //     console.log(posts);
  //   })
  // }
  function buildUrl(){
    urlPage = 'http://neopoliticatv.org/category/noticias/page/'+currentPage+'?json=1';
  }
  // (function(){
  //   downloadData();
  // }());
  return {
    // promise:promise,
    currentPage:function(){
      return currentPage;
    },
    maxPage:function(){
      return this.maxPage;
    },
    all:function(){
      buildUrl();
      return $http.get(urlPage).then(function(response){
        posts = response.data.posts;
        //console.log(response);
        this.maxPage = response.data.pages;
        //console.log(this.maxPage);
        return posts;
      })
    },
    setPage:function(page){
      posts = [];
      currentPage = page;
    },
    getPost:function(postId){
      for(i=0;i<posts.length;i++){
        if(posts[i].id === parseInt(postId)){
          return posts[i];
        }
      }
      return null;
    }
  }
})
.service('ColumasProvider',function(){
  return{
    getBackground:function(slug){
      switch (slug) {
        case 'contraesquina-politica':
          return './img/columnafernando.jpg';
          break;
        case 'articulista-invitado':
          return './img/columnahector.jpg';
          break;
        default:
          return './img/default.jpg';
          break;
      }
    },
    getEditor:function(slug){
      switch (slug) {
        case 'contraesquina-politica':
          return 'Fernando Martinez Plascencia'
          break;
        case 'articulista-invitado':
          return 'Héctor Yunes Landa'
          break;
        case 'ventanas-rotas':
          return 'Víctor Manuel Vallejo Cruz'
          break;
        case 'luis-alberto-chavez-focil':
          return 'Luis A. Chávez'
          break;
        case 'chucho-mon':
          return 'Chucho Mon'
          break;
        default:
          return ' ';
          break;
      }
    }
  }
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
