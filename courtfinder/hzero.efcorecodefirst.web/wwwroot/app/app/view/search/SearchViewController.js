Ext.define('CourtFinderApp.view.search.SearchViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.search-searchview',

    onPainted: function () {
        this.findCourtsNearBy('Target Center Minneapolis MN');
    },

    onSearchBtnClick: function () {
        var me = this,
            location = me.getView().down('#locationField');
        if (location.getValue()) {
            me.findCourtsNearBy(location.getValue());
        }
    },

    findCourtsNearBy: function (location) {
        var me = this,
            resultView = me.getView().down('#resultView');
        Ext.Ajax.request({
            url: '../api/CourtFinder/FindCourts',
            params: { location: location },
            method: 'POST',

            success: function (response, opts) {
                var result = JSON.parse(response.responseText);
                resultView.getStore().loadData(result);
            },

            failure: function (response, opts) {
                Ext.toast('Server issue: ' + response.status + ' ' + response.statusText, 4000);
            }
        })
    }
});
