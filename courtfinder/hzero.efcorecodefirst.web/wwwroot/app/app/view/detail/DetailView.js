
Ext.define('CourtFinderApp.view.detail.DetailView', {
    xtype: 'detail-detailview',
    extend: 'Ext.panel.Panel',

    requires: [
        'CourtFinderApp.view.detail.DetailViewController',
        'CourtFinderApp.view.detail.DetailViewModel',

        'CourtFinderApp.view.review.ReviewEntryView'
    ],

    controller: 'detail-detailview',
    viewModel: {
        type: 'detail-detailview'
    },

    bind: {
        title: '{name}'
    },
    padding: 0,
    scrollable: 'y',
    layout: 'vbox',
    cls: 'detail-view',
    items: [{
        height: 200,
        width: 400,
        bind: {
            html: '<img src="{thumbUrl}" />'
        }
    },{
        bind: {
            html: [
                '<div class="hz-header">',
                    '<div class="hz-go-link">',
                        '<a href="http://www.google.com/maps/search/?api=1&query={lat},{lng}" target="_blank">',
                            '<span class="x-fa fa-stack hz-go-link-icon">',
                                '<span class="x-fa fa-circle fa-stack-2x"></span>',
                                '<span class="x-fa fa-car fa-stack-1x fa-inverse"></span>',
                            '</span>',
                            '<h4>Go there</h4>',
                        '</a>',
                    '</div>',
                    '<div>',
                        '<span class="x-fa fa-star rating {hasRating1}"></span>',
                        '<span class="x-fa fa-star rating {hasRating2}"></span>',
                        '<span class="x-fa fa-star rating {hasRating3}"></span>',
                        '<span class="x-fa fa-star rating {hasRating4}"></span>',
                        '<span class="x-fa fa-star rating {hasRating5}"></span>',
                        '<span> {rating} out of 5 ({ratingCount}) </span>',
                    '</div>',
                    '<div>{formatLiteral}</div>',
                    '<div>{locationLiteral}</div>',
                '</div>'
            ].join('')
        }
    }, {
        xtype: 'container',
        padding: 5,
        layout: 'hbox',
        defaults: {
            margin: '0 5 0 0'
        },
        items: [{
            xtype: 'button',
            ui: 'action',
            text: 'Write Review',
            handler: 'onWriteReviewClick'
        }, {
            xtype: 'selectfield',
            bind: {
                value: '{reviewSortBy}'
            },
            placeholder: 'sort by',
            options: [
                { text: 'Highest Rating First', value: 1 },
                { text: 'Lowest Rating First', value: 2 }
            ],
            listeners: {
                change: 'onReviewSortChange'
            }
        }]
    }, {
        xtype: 'dataview',
        bind: {
            store: '{reviews}'
        },
        itemTpl: [
            '<div class="hz-review-row">',
                '<h3>{reviewer}</h3>',
                '<div>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(1, values) ]}"></span>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(2, values) ]}"></span>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(3, values) ]}"></span>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(4, values) ]}"></span>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(5, values) ]}"></span>',
                '</div>',
                '<p>{review}</p>',
            '</div>',
            {
                isChecked: function (start, values) {
                    return start <= values.rating ? 'checked' : '';
                }
            }
        ],
    }],

    listeners: {
        opened: 'onOpened',
        destroy: 'onDestroy'
    }
});
