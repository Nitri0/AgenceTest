'use stric'

var app = angular.module('app', ['uiGmapgoogle-maps'])

const ENPOINT_URL = "http://localhost:3000/get-data"

app.controller('mainCtrl', function ($scope, $http) {
    var vm = this;
    vm.input = "lima";
    vm.response = "";
    vm.err = "";


    //map data
    vm.map = {
        center: {latitude: 40.1451, longitude: -99.6680 }, 
        zoom: 7,
        infoWindow:{
            options:{
                position :{ 
                    lat: 51.5286416,
                    lng: -0.1015987
                },

                show : true,
            },
            template: '<div> example <div>'
        }
    };
    vm.options = {scrollwheel: false};


    vm.send = function(){
        vm.map.infoWindow.options.show = false;
        var data = { city: vm.input }
        $http.post(ENPOINT_URL, data)
                .then(function(res){
                    var data = res.data.data
                    vm.err = "";
                    vm.response = data

                    var lat = parseFloat(data.city.geo[0])
                    var lng = parseFloat(data.city.geo[1])

                    vm.map.center = {
                        latitude : lat,
                        longitude: lng,
                    }
                    
                    vm.map.infoWindow.options.position = {
                        lat: lat,
                        lng: lng
                    }
                    className = getClassNameFromAqi(data.aqi)
                    console.log(lat,lng)
                    vm.map.infoWindow.template =  
                            `
                            <div>
                                <div class="color-bar ${className}">
                                </div>
                                <div class="text-info">
                                    <div >
                                        ${data.city.name}
                                    </div >
                                    <div >
                                        Aqi: ${data.aqi} 
                                    </div >
                                </div>
                            </div>`
                    vm.zoom = 6
                    vm.map.infoWindow.options.show = true;
                },
                // error 
                function(err){
                    vm.response = ""
                    vm.err = err.data.data
                    console.log()
                })
    }

    var getClassNameFromAqi = function(aqi){
        if (aqi < 51){
            return "good";
        }else if( aqi < 101){
            return 'moderate';
        }else if( aqi < 151){
            return 'unhealthy-for-groups';
        }else if( aqi < 201){
            return 'unhealthy-for-groups';
        }else if( aqi < 301){
            return 'unhealthy';
        }else{
            return 'hazardous';
        }
    }

});