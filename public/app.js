(function(){
  
  angular.module("myApp", ['angular-loading-bar','ngAnimate'])
  .controller({MainCtrl:MainCtrl});
  
  MainCtrl.$inject = ['$http','$timeout','$scope'];
  
  function MainCtrl($http,$timeout,$scope){
    var vm = this;
    vm.foods = [];
    vm.btn_msg = "";
    vm.searchOption = "nothing";
    vm.showOption = false;
    
    vm.firstInit = function(){
      return {
        
        refresh: function(){
          
        }
        
      }
    }
    
//    console.log(window);
//    console.log(window.map.zoom);

    vm.searchBtn = function(){
      if(vm.searchOption === "searchBuilding"){
        vm.getBuilding();
      }else if(vm.searchOption === "searchFood"){
        vm.getFood();
      }else if(vm.searchOption === "searchBud"){
        vm.getBus();
      }else{
        vm.btn_msg = "Please choose an option above";
      }
    };
    
    
    //FOOD BUTTON
    vm.getFood = function(){
      vm.searchOption = "searchFood";
      vm.btn_msg = "What are you craving for?";
      vm.showOption = true;
      if(vm.search === null){
        vm.btn_msg2 = "Please input something";
      }else{
        var searchData = {
          myterm: vm.search,
          myoption: vm.selectoption
        };
      };
      $http.post('/api/yelp', searchData).success(function(data){
        console.log(JSON.parse(data.body));
        var checkParse = JSON.parse(data.body);
        vm.foods = checkParse.businesses;
      });
    };
    
    //BUILDING BUTTON
    vm.getBuilding = function(){
      vm.searchOption = "searchBuilding"
      vm.btn_msg = "Enter a Rutger building name";
      $http.get("/api/buildings").success(function(data){
        vm.buildings = data;
        vm.buildings.forEach(function(e,i){
          var myLatLng = {
            lat: Number(e.location.latitude),
            lng: Number(e.location.longitude)
          };

          var marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              title: "Big Map"
    //          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          });
//          console.log(myLatLng);
        });
        
      });
    };
    
    //BUS BUTTON
    vm.getBus = function(){
      vm.searchOption = "searchBus";
      vm.btn_msg = "Enter your bus stop ID";
    };
    
    
  };
  
  
  
})();