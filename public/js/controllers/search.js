'use stric'

var app = angular.module('app', ['uiGmapgoogle-maps'])

const ENPOINT_URL = "http://localhost:3000/get-data"

app.controller('mainCtrl', function ($scope, $http) {
    var vm = this;
    vm.input = "lima";
    vm.response = "";
    vm.err = "";
    vm.loading = false;

    // Data
    vm.map = {
        center: {latitude: 0, longitude: 0}, 
        zoom: 7,
        infoWindow:{
            options:{
                position :{ 
                    lat: 0,
                    lng: 0
                },

                show : true,
            },
            template: ''
        }
    };
    vm.options = {scrollwheel: false};


    // Envio de string
    vm.send = function(){
        vm.loading =  true
        vm.map.infoWindow.options.show = false;
        vm.err = "";
        $http.post(ENPOINT_URL, { city: vm.input })
                .then(function(res){
                    vm.loading =  false
                    var data = res.data.data
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
                    vm.map.infoWindow.template =  
                            `<div>
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
                function(err){
                    vm.loading =  false
                    vm.response = ""
                    vm.err = err.data.data
                })
    }

    // verificador del color segun nivel aqi
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