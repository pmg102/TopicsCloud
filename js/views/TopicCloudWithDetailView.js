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

    function TopicCloudWithDetailView($element, topics) {
        this.topicDetailView = new TopicDetailView($element.find('#topic-details'), topics);
        this.topicCloudView = new TopicCloudView($element.find('#topic-cloud'), topics, this.topicDetailView);
    }

    TopicCloudWithDetailView.prototype.render = function() {
        this.topicCloudView.render();
        this.topicDetailView.render();
    };

    return TopicCloudWithDetailView;
});