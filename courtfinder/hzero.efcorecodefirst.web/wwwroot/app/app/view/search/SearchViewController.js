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
        var me = this;
        me.expandCollapseSearchPanel(false);

        var navigationView = me.getView().down('#navigationView');
        navigationView.setActiveItem(1);
        me.getView().down('#detailView').fireEvent('opened', uid);
    },

    onInspectRoute: function (lat, lng) {
        var me = this;
        me.expandCollapseSearchPanel(false);
        
        var navigationView = me.getView().down('#navigationView');
        navigationView.setActiveItem(2);
        me.getView().down('#inspectView').fireEvent('opened', lat, lng);

        var googleMap = me.getView().down('#mapView').getMap();
        if (!googleMap._tempMarker) {
            me.toggleTempMarker(googleMap, { lat: lat, lng: lng });
            googleMap.panTo(googleMap._tempMarker.getPosition()); // setCenter ain't working
        }
    },

    onPainted: function () {
        var me = this,
            googleMap = me.getView().down('#mapView').getMap();
        googleMap.addListener('click', Ext.bind(me.onGoogleMapClick, me));
        me.addIdleListener(googleMap);
    },

    onGoogleMapClick: function (event) {
        var me = this,
            googleMap = me.getView().down('#mapView').getMap(),
            data = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
        if (me.toggleTempMarker(googleMap, data)) {
            me.redirectTo('inspect/' + data.lat + '&' + data.lng, true);
        } else {
            me.redirectTo('search');
        }
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

    onDetailFinished: function (action) {
        var me = this,
            googleMap = me.getView().down('#mapView').getMap();
        me.redirectTo('search');
    },

    onInspectFinished: function (action) {
        var me = this,
            googleMap = me.getView().down('#mapView').getMap();
        if (googleMap._tempMarker) {
            google.maps.event.clearInstanceListeners(googleMap._tempMarker);
            googleMap._tempMarker.setMap(null);

            delete googleMap._tempMarker;
        }

        me.redirectTo('search');

        if (action == 'add') {
            me.findCourtsWithinBounds(googleMap);
        }
    },

    onSearchResultExpandClick: function () {
        var me = this;
        me.expandCollapseSearchPanel(false);
    },

    onSearchResultCollapseClick: function () {
        var me = this;
        me.expandCollapseSearchPanel(true);
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

    findCourtsWithinBounds: function (googleMap) {
        var me = this,
            resultView = me.getView().down('#resultView'),
            bounds = googleMap.getBounds(),
            swBound = bounds.getSouthWest(),
            neBound = bounds.getNorthEast(),
            sw = { lat: swBound.lat(), lng: swBound.lng() },
            ne = { lat: neBound.lat(), lng: neBound.lng() };
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
                me.mergeMarkers(googleMap, result);
            },

            failure: function (response, opts) {
                Ext.toast('Server issue: ' + response.status + ' ' + response.statusText, 4000);
            }
        });
    },

    mergeMarkers: function (googleMap, data) {
        var me = this;
        googleMap._markers = CourtFinderApp.EnumerableService.fullOuterJoin(
            googleMap._markers || [],
            data,
            function (m) { return m._data.uid; },
            function (d) { return d.uid; },
            function (left, right) {
                var result = null;
                if (right === null) {
                    me.deleteMarker(left);
                } else {
                    result = left || me.createMarker(googleMap, right);
                }

                return result;
            });
    },

    createMarker: function (googleMap, data) {
        var me = this, 
            result = new google.maps.Marker({
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
        result.addListener('click', function () {
            me.redirectTo('detail/' + result._data.uid, true);
        });
        result.addListener('mouseover', function () {
            result._infoWindow.open(googleMap, result);
        });
        result.addListener('mouseout', function () {
            result._infoWindow.close(googleMap, result);
        });

        return result;
    },

    deleteMarker: function (marker) {
        google.maps.event.clearInstanceListeners(marker);
        marker._infoWindow.close();
        delete marker._infoWindow;
        marker.setMap(null);
    },

    toggleTempMarker: function (googleMap, data) {
        var me = this,
            toggled = true;
        if (googleMap._tempMarker) {
            google.maps.event.clearInstanceListeners(googleMap._tempMarker);
            googleMap._tempMarker.setMap(null);

            delete googleMap._tempMarker;
            toggled = false;
        } else {
            googleMap._tempMarker = new google.maps.Marker({
                position: new google.maps.LatLng(data.lat, data.lng),
                map: googleMap,
                animation: google.maps.Animation.DROP
            });
            googleMap._tempMarker.addListener('click', function () {
                me.redirectTo('inspect/' + data.lat + '&' + data.lng, true);
            });
        }

        return toggled;
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
            me.findCourtsWithinBounds(googleMap);
        });
    },

    expandCollapseSearchPanel: function (collapsed) {
        var view = this.getView();
        if (collapsed) {
            view.down('#searchPanel').addCls('hz-collapsed');
            view.down('#searchPanelCollapseExpandCt').addCls('hz-collapsed');
        } else {
            view.down('#searchPanel').removeCls('hz-collapsed');
            view.down('#searchPanelCollapseExpandCt').removeCls('hz-collapsed');
        }
    }
});