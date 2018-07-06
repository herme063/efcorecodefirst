Ext.define('CourtFinderApp.view.search.SearchViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.search-searchview',

    routes: {
        'search': 'onSearchRoute',
        'detail/:uid': 'onDetailRoute',
        'inspect/:lat&:lng': {
            action: 'onInspectRoute',
            conditions: {
                ':lat': '([0-9\.,-]+)',
                ':lng': '([0-9\.,-]+)'
            }
        }
    },

    onSearchRoute: function () {
        var me = this,
            navigationView = me.getView().down('#navigationView');
        navigationView.setActiveItem(0);
    },

    onDetailRoute: function (uid) {
        var me = this,
            navigationView = me.getView().down('#navigationView');
        navigationView.setActiveItem(1);
        me.getView().down('#detailView').fireEvent('opened', uid);
    },

    onInspectRoute: function (lat, lng) {
        var me = this,
            navigationView = me.getView().down('#navigationView');
        navigationView.setActiveItem(2);
        me.getView().down('#inspectView').fireEvent('opened', lat, lng);
    },

    onPainted: function () {
        var me = this;
        me.getView().fireEvent('search', '600 N 1st Ave, Minneapolis, MN 55403'); // target center

        var googleMap = me.getView().down('#mapView').getMap();
        google.maps.event.addListener(googleMap, 'click', Ext.bind(me.onGoogleMapClick, me));
    },

    onGoogleMapClick: function (event) {
        var me = this,
            googleMap = me.getView().down('#mapView').getMap(),
            data = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
        me.toggleTempMarker(googleMap, data);
    },

    onSearch: function (location) {
        var me = this;
        if (location) {
            me.getGeocode(location);
        }
    },

    onSearchKeyUp: function (field, e) {
        var me = this;
        if (e.event.keyCode === 13) {
            me.getView().fireEvent('search', field.getValue());
        }
    },

    onSearchClick: function (btn) {
        var me = this,
            locationField = me.getView().down('#locationField');
        if (locationField.getValue()) {
            me.getView().fireEvent('search', locationField.getValue());
        }
    },

    onResultSelect: function (dataview, record, eOpts) {
        this.redirectTo('detail/' + record.data.uid)
    },

    onDetailFinish: function () {
        this.redirectTo('search');
    },

    onInspectFinish: function () {
        var me = this,
            googleMap = me.getView().down('#mapView').getMap();
        if (googleMap._tempMarker) {
            google.maps.event.clearInstanceListeners(googleMap._tempMarker);
            googleMap._tempMarker.setMap(null);

            delete googleMap._tempMarker;
        }

        me.redirectTo('search');
    },

    getGeocode: function (location) {
        var me = this,
            googleMap = me.getView().down('#mapView').getMap();
        me.removeIdleListener(googleMap);

        Ext.Ajax.request({
            url: '../api/CourtFinder/FindLocation',
            method: 'POST',
            params: { location: location },

            success: function (response, opts) {
                var result = JSON.parse(response.responseText);
                googleMap.setZoom(14);
                googleMap.panTo({ lat: result.lat, lng: result.lng });
                me.addIdleListener(googleMap);
            },

            failure: function (response, opts) {
                Ext.toast('Server issue: ' + response.status + ' ' + response.statusText, 4000);
            }
        });
    },

    findCourtsWithinBounds: function (sw, ne) {
        var me = this,
            resultView = me.getView().down('#resultView'),
            googleMap = me.getView().down('#mapView').getMap();
        Ext.Ajax.request({
            url: '../api/CourtFinder/FindCourts',
            method: 'POST',
            params: {
                swLat: sw.lat,
                swLng: sw.lng,
                neLat: ne.lat,
                neLng: ne.lng
            },

            success: function (response, opts) {
                var result = JSON.parse(response.responseText);
                resultView.getStore().loadData(result);
                me.clearMarkers(googleMap);

                result.forEach(function (r) {
                    me.addMarker(googleMap, r);
                });

                //me.redirectTo('search');
            },

            failure: function (response, opts) {
                Ext.toast('Server issue: ' + response.status + ' ' + response.statusText, 4000);
            }
        });
    },

    clearMarkers: function (googleMap) {
        // todo: remove all markers
        if (googleMap._markers) {
            googleMap._markers.forEach(function (m) {
                google.maps.event.clearInstanceListeners(m);
                m._infoWindow.close();
                delete m._infoWindow;
                m.setMap(null);
            });
            googleMap._markers = [];
        }
    },

    addMarker: function (googleMap, data) {
        var me = this,
            m = new google.maps.Marker({
                position: new google.maps.LatLng(data.lat, data.lng),
                map: googleMap,
                label: {
                    text: data.location,
                    fontWeight: 'bold'
                },
                _infoWindow: new google.maps.InfoWindow({
                    content: me.getMarkerInfoTpl(data),
                    maxWidth: 450,
                    disableAutoPan: true
                }),
                _data: data
            });
        m.addListener('click', function () {
            me.redirectTo('detail/' + m._data.uid);
        });
        m.addListener('mouseover', function () {
            m._infoWindow.open(googleMap, m);
        });
        m.addListener('mouseout', function () {
            m._infoWindow.close(googleMap, m);
        });
        (googleMap._markers || (googleMap._markers = [])).push(m);
    },

    toggleTempMarker: function (googleMap, data) {
        var me = this;
        if (googleMap._tempMarker) {
            google.maps.event.clearInstanceListeners(googleMap._tempMarker);
            googleMap._tempMarker.setMap(null);

            delete googleMap._tempMarker;
            me.redirectTo('search');
        } else {
            googleMap._tempMarker = new google.maps.Marker({
                position: new google.maps.LatLng(data.lat, data.lng),
                map: googleMap,
                animation: google.maps.Animation.DROP
            });
            me.redirectTo('inspect/' + data.lat + '&' + data.lng);
        }
    },

    getMarkerInfoTpl: function (data) {
        var me = this,
            resultView = me.getView().down('#resultView');
        return resultView.infoTpl.apply(data);
    },

    removeIdleListener: function (googleMap) {
        if (googleMap._idleListener) {
            google.maps.event.removeListener(googleMap._idleListener);
            delete googleMap._idleListener;
        }
    },

    addIdleListener: function (googleMap) {
        var me = this;
        me.removeIdleListener(googleMap);
        googleMap._idleListener = googleMap.addListener('idle', function () {
            var bounds = googleMap.getBounds(),
                swBound = bounds.getSouthWest(),
                neBound = bounds.getNorthEast();
            me.findCourtsWithinBounds(
                { lat: swBound.lat(), lng: swBound.lng() },
                { lat: neBound.lat(), lng: neBound.lng() }
            );
        });
    }
});