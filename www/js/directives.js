angular.module('starter.directives',[])

.directive('news',function(){
  return{
    restrict: 'E',
    scope:{
      post:'=post'
    },
    templateUrl:'templates/news.html'
  }
})
