Ext.define('CourtFinderApp.view.search.SearchViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.search-searchview',

    routes: {
        'search': 'onSearchRoute',
        'detail/:uid': 'onDetailRoute',
    },

    onSearchRoute: function () {
        var me = this,
            navigationView = me.getView().down('#navigationView');
        navigationView.setActiveItem(0);
    },

    onDetailRoute: function (uid) {
        var me = this,
            navigationView = me.getView().down('#navigationView'),
            resultView = me.getView().down('#resultView'),
            data = null;
        resultView.getStore().getRange().forEach(function (r) {
            if (data == null && r.data.uid === uid) {
                data = r.data;
            }
        });

        if (data) {
            navigationView.setActiveItem(1);
            me.getView().down('#detailView').fireEvent('opened', data);
        } else {
            Ext.toast('Location details not found: ' + uid, 4000);
            me.redirectTo('search');
        }
    },

    onPainted: function () {
        var me = this;
        me.getView().fireEvent('search', '600 N 1st Ave, Minneapolis, MN 55403'); // target center
    },

    onSearch: function (location) {
        var me = this;
        if (location) {
            me.getGeocode(location);
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

    onDetailBackClick: function () {
        this.redirectTo('search');
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
           // m._infoWindow.close(googleMap, m);
        });
        (googleMap._markers || (googleMap._markers = [])).push(m);
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
