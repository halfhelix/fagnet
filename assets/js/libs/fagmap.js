"use strict";

function initMap(mapId, markerIconURL) {
    if ($('#' + mapId).length > 0) {
        window.fagMap = {};
        fagMap.settings = {};
        fagMap.markers = [];
        fagMap.themes = {};
        fagMap.markersObjList = [];

        fagMap.themes.lightGray = [{
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#d3d3d3"
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "color": "#808080"
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#b3b3b3"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#ffffff"
            }, {
                "weight": 1.8
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#d7d7d7"
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#ebebeb"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{
                "color": "#a7a7a7"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#efefef"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#696969"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#737373"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#d6d6d6"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {}, {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#dadada"
            }]
        }];


        fagMap.mapSettings = {
            zoom: 12,
            center: {
                lat: 40.720,
                lng: -73.996
            },
            disableDefaultUI: true,
            styles: fagMap.themes.lightGray,
            markerIcon: markerIconURL,
            googleLogoDisable: true,
            zoomControl: true
        };


        fagMap.parseCord = function(str) {
            var cords = str.split(',');

            return {
                lat: +cords[0],
                lng: +cords[1]
            };
        };

        fagMap.initMapData = function() {
            var $dataMap = $('.data-map')[0],
                $dataMarkers = $('.data-pointmarker'),
                mapCords = $($dataMap).attr('data-cord'),
                mapZoom = +$($dataMap).attr('data-zoom'); // str to number

            if (!isNaN(mapZoom)) {
                fagMap.mapSettings.zoom = mapZoom;
            }

            fagMap.mapSettings.center = fagMap.parseCord(mapCords);

            for (var i = 0; i < $dataMarkers.length; i++) {
                var obj = {
                    cord: fagMap.parseCord($($dataMarkers[i]).attr('data-cord')),
                    title: $($dataMarkers[i]).attr('data-title'),
                    link: $($dataMarkers[i]).attr('data-link'),
                    location: $($dataMarkers[i]).attr('data-location'),
                    postNumber: $($dataMarkers[i]).attr('data-post-number'),
                    position: fagMap.parseCord($($dataMarkers[i]).attr('data-cord'))
                }
                fagMap.markers.push(obj);
            }
        }

        fagMap.addMarker = function(position) {
            var marker = new google.maps.Marker({
                position: position,
                icon: fagMap.mapSettings.markerIcon,
                map: fagMap.map
            });
            fagMap.markersObjList.push(marker);
            return marker;
        }

        fagMap.setMarkers = function() {
            //console.log(fagMap.markers);
            for (var i = 0; i < fagMap.markers.length; i++) {

                var marker, box, tmp;

                marker = fagMap.addMarker(fagMap.markers[i].position);


                tmp = '<h3>' + fagMap.markers[i].title + '</h3><div class="infoBox__text">' + fagMap.markers[i].location + '</div><a href="' + fagMap.markers[i].link + '">' + fagMap.markers[i].postNumber + ' posts</a>';

                box = new InfoBox({
                    content: tmp,
                    disableAutoPan: false,
                    pixelOffset: new google.maps.Size(-95, 0),
                    boxStyle: {
                        opacity: 1,
                        width: "190px"
                    },
                    closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                    infoBoxClearance: new google.maps.Size(1, 1)
                });

                google.maps.event.addListener(marker, 'click', function() {
                    $('.infoBox img').click();
                    box.open(fagMap.map, this);
                })
            }

        }

        fagMap.initMapData();
        fagMap.mapDiv = document.getElementById(mapId);
        fagMap.map = new google.maps.Map(fagMap.mapDiv, fagMap.mapSettings);
        fagMap.setMarkers();
    };
}

$(window).load(
    function() {
        initMap('map', 'build/images/marker.png');
    }
);