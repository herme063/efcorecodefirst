Ext.define('CourtFinderApp.view.search.SearchView', {
    xtype: 'search-searchview',
    extend: 'Ext.container.Container',

    requires: [
        'Ext.ux.google.Map',

        'CourtFinderApp.view.search.SearchViewController',
        'CourtFinderApp.view.search.SearchViewModel',
        'CourtFinderApp.model.search.SearchResultModel',

        'CourtFinderApp.view.detail.DetailView'
    ],

    controller: 'search-searchview',
    viewModel: {
        type: 'search-searchview'
    },

    layout: 'hbox',
    items: [{
        xtype: 'panel',
        width: 400,
        padding: 0,
        layout: 'vbox',
        collapsible: true,
        items: [{
            xtype: 'container',
            layout: 'hbox',
            cls: 'search-tool-view',
            items: [{
                flex: 1,
                xtype: 'textfield',
                itemId: 'locationField',
                label: 'zip or city, state',
                labelAlign: 'placeholder'
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-search',
                handler: 'onSearchClick'
            }]
        },{
            flex: 1,
            xtype: 'container',
            itemId: 'navigationView',
            layout: 'card',
            items: [{
                xtype: 'dataview',
                itemId: 'resultView',
                store: {
                    type: 'array',
                    model: 'CourtFinderApp.model.search.SearchResultModel'
                },
                scrollable: 'y',
                emptyText: '(no court found nearby)',
                cls: 'search-result-view',
                itemTpl: [
                    '<div class="result-row">',
                        '<h3>{location}</h3>',
                        '<div>',
                            '<span class="x-fa fa-star rating {[ this.isChecked(1, values) ]}"></span>',
                            '<span class="x-fa fa-star rating {[ this.isChecked(2, values) ]}"></span>',
                            '<span class="x-fa fa-star rating {[ this.isChecked(3, values) ]}"></span>',
                            '<span class="x-fa fa-star rating {[ this.isChecked(4, values) ]}"></span>',
                            '<span class="x-fa fa-star rating {[ this.isChecked(5, values) ]}"></span>',
                        '</div>',
                        '<h4>{rating} out of 5 ({ratingCount})</h4>',
                    '</div>',
                    {
                        isChecked: function (start, values) {
                            return start <= values.rating ? 'checked' : '';
                        }
                    }
                ],
                listeners: {
                    select: 'onResultSelect'
                }
            }, {
                xtype: 'detail-detailview',
                itemId: 'detailView',
                tools: [{
                    type: 'prev',
                    handler: function (btn) {
                        btn.up('search-searchview').getController().onDetailBackClick(btn);
                    }
                }]
            }]
        }]
    }, {
        flex: 1,
        xtype: 'map',
        itemId: 'mapView'
    }],

    listeners: {
        painted: 'onPainted',
        search: 'onSearch'
    }
});