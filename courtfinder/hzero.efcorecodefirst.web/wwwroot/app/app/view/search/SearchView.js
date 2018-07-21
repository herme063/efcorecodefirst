Ext.define('CourtFinderApp.view.search.SearchView', {
    xtype: 'search-searchview',
    extend: 'Ext.container.Container',

    requires: [
        'Ext.ux.google.Map',

        'CourtFinderApp.view.search.SearchViewController',
        'CourtFinderApp.view.search.SearchViewModel',
        'CourtFinderApp.model.search.SearchResultModel',

        'CourtFinderApp.view.detail.DetailView',
        'CourtFinderApp.view.inspect.InspectView',
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
        itemId: 'searchPanel',
        cls: 'search-panel',
        items: [{
            xtype: 'container',
            layout: 'hbox',
            cls: 'hz-search-tool-view',
            items: [{
                flex: 1,
                xtype: 'textfield',
                itemId: 'locationField',
                label: 'zip or city, state',
                labelAlign: 'placeholder',
                clearIcon: false,
                listeners: {
                    keyup: 'onSearchKeyUp'
                }
            }, {
                xtype: 'button',
                style: 'font-size: 16px;',
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
                itemTpl: new Ext.XTemplate(
                    '<div class="hz-result-row">',
                        '<img class="hz-thumb" src="../api/CourtFinder/GetCourtThumb?idx=0&uid={uid}" />',
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
                ),
                infoTpl: new Ext.XTemplate(
                    '<div class="search-result-info">',
                        '<img class="hz-thumb" src="../api/CourtFinder/GetCourtThumb?idx=0&uid={uid}" />',
                        '<div class="hz-summary">',
                            '<h4>{rating}</h4>',
                            '<div>',
                                '<span class="x-fa fa-star rating {[ this.isChecked(1, values) ]}"></span>',
                                '<span class="x-fa fa-star rating {[ this.isChecked(2, values) ]}"></span>',
                                '<span class="x-fa fa-star rating {[ this.isChecked(3, values) ]}"></span>',
                                '<span class="x-fa fa-star rating {[ this.isChecked(4, values) ]}"></span>',
                                '<span class="x-fa fa-star rating {[ this.isChecked(5, values) ]}"></span>',
                            '</div>',
                            '<h5>{ratingCount} review{[ values.ratingCount > 1 ? "s" : "" ]}</h5>',
                        '</div>',
                    '</div>',
                    {
                        isChecked: function (start, values) {
                            return start <= values.rating ? 'checked' : '';
                        }
                    }
                ),
                listeners: {
                    select: 'onResultSelect'
                }
            }, {
                xtype: 'detail-detailview',
                itemId: 'detailView',
                listeners: {
                    finished: 'onDetailFinished'
                }
            }, {
                xtype: 'inspect-inspectview',
                itemId: 'inspectView',
                listeners: {
                    finished: 'onInspectFinished'
                }
            }]
        }]
    }, {
        flex: 1,
        xtype: 'container',
        layout: 'fit',
        items: [{
            xtype: 'container',
            cls: 'search-panel-collapse-expand-ct',
            itemId: 'searchPanelCollapseExpandCt',
            layout: {
                type: 'vbox',
                pack: 'start'
            },
            items: [{
                cls: 'expander',
                html: '<i class="fa fa-search"></i>',
                tooltip: 'show search tool',
                listeners: {
                    click: {
                        element: 'element',
                        preventDefault: true,
                        fn: 'onSearchResultExpandClick'
                    }
                }
            }, {
                cls: 'collapser',
                html: '<i class="fa fa-caret-left"></i>',
                tooltip: 'hide search tool',
                listeners: {
                    click: {
                        element: 'element',
                        preventDefault: true,
                        fn: 'onSearchResultCollapseClick'
                    }
                }
            }]
        }, {
            xtype: 'map',
            itemId: 'mapView',
            options: {
                center: { 
                    // target center
                    lat: 44.97946204601796,
                    lng: -93.27620029449463
                }
            }
        }]
    }],

    listeners: {
        painted: 'onPainted',
        search: 'onSearch'
    }
});