/*
 * TopicCloudWithDetail View
 *
 * Responsibility:
 *      Combine a TopicCloudView with a TopicDetailView into a single connected view
 * Collaborators:
 *      TopicCloudView, TopicDetailView
 */

define(function(require) {
    var TopicDetailView = require('./TopicDetailView');
    var TopicCloudView = require('./TopicCloudView');

    TopicCloudWithDetailApp = new Backbone.Marionette.Application();

    TopicCloudWithDetailApp.addRegions({
        mainRegion: "#topic-cloud",
        detailRegion: '#topic-details'
    });

    TopicCloudWithDetailApp.addInitializer(function(topics){
        TopicCloudWithDetailApp.mainRegion.show(new TopicCloudView({
            collection: topics
        }));
        TopicCloudWithDetailApp.detailRegion.show(new TopicDetailView({
            collection: topics
        }));
    });

    return TopicCloudWithDetailApp;
});