Ext.define('CourtFinderApp.view.inspect.InspectViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.inspect-inspectview',
    data: {
        lat: null,
        lng: null
    },
    formulas: {
        latFriendly: function (get) {
            var lat = Number(get('lat')),
                aLat = Math.abs(lat),
                deg = Math.floor(aLat),
                min = Math.floor(60*(aLat-deg)),
                sec = Math.floor(3600*(aLat-deg) - 60*min),
                ns = lat < 0 ? 'S' : 'N';

            return Ext.String.format('{0}&deg; {1}\' {2}" {3}', deg, min, sec, ns);
        },

        lngFriendly: function (get) {
            var lng = Number(get('lng')),
                aLng = Math.abs(lng),
                deg = Math.floor(aLng),
                min = Math.floor(60*(aLng-deg)),
                sec = Math.floor(3600*(aLng-deg) - 60*min),
                ns = lng < 0 ? 'W' : 'N';

            return Ext.String.format('{0}&deg; {1}\' {2}" {3}', deg, min, sec, ns);
        }
    }
});
