Ext.define('CourtFinderApp.view.search.SearchView', {
    xtype: 'search-searchview',
    extend: 'Ext.container.Container',

    requires: [
        'Ext.ux.google.Map',

        'CourtFinderApp.view.search.SearchViewController',
        'CourtFinderApp.view.search.SearchViewModel',

        'CourtFinderApp.model.search.SearchResultModel'
    ],

    controller: 'search-searchview',
    viewModel: {
        type: 'search-searchview'
    },

    layout: 'hbox',
    items: [{
        xtype: 'container',
        layout: 'vbox',
        width: 400,
        padding: 5,
        items: [{
            xtype: 'fieldset',
            title: 'Find Courts',
            layout: 'vbox',
            items: [{
                xtype: 'textfield',
                itemId: 'locationField',
                label: 'zip or city, state',
                labelAlign: 'placeholder'
            }, {
                xtype: 'selectfield',
                itemId: 'milesField',
                label: 'miles around',
                labelAlign: 'placeholder',
                options: [
                    { text: '10', value: 10 },
                    { text: '25', value: 25 },
                    { text: '50', value: 50 },
                    { text: '100', value: 100 }
                ]
            }, {
                xtype: 'button',
                text: 'Search',
                handler: 'onSearchBtnClick'
            }]
        }, {
            xtype: 'fieldset',
            title: 'Results',
            layout: 'fit',
            items:[{
                xtype: 'dataview',
                itemId: 'resultView',
                store: {
                    type: 'array',
                    model: 'CourtFinderApp.model.search.SearchResultModel'
                },
                scrollable: 'y',
                emptyText: '(no court found nearby)',
                itemTpl: [
                    '<div>',
                    '<h3>{location}</h3>',
                    '<div>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(1, values) ]}"></span>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(2, values) ]}"></span>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(3, values) ]}"></span>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(4, values) ]}"></span>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(5, values) ]}"></span>',
                    '</div>',
                    '<h4>{rating} out of 5 for {ratingCount} review{[ values.ratingCount > 1 ? "s" : "" ]}</h4>',
                    '</div>',
                    {
                        isChecked: function (start, values) {
                            return start <= values.rating ? 'checked' : '';
                        }
                    }
                ]
            }]
        }]
    }, {
        xtype: 'map',
        flex: 4,
        mapOptions: {
            center: { lat: 44.980487, lng: -93.276447 }
        }
    }],

    listeners: {
        painted: 'onPainted'
    }
});
