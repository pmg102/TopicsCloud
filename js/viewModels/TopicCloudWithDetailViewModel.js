/*
 * TopicCloudWithDetail ViewModel
 *
 * Responsibility:
 *      Combine a TopicCloudViewModel with a TopicDetailViewModel into a single connected view
 * Collaborators:
 *      TopicCloudViewModel, TopicDetailViewModel
 */

define(function(require) {
    var TopicDetailViewModel = require('./TopicDetailViewModel');
    var TopicCloudViewModel = require('./TopicCloudViewModel');

    function TopicCloudWithDetailViewModel(topics) {
        this.topicDetail = new TopicDetailViewModel(topics);
        this.topicCloud = new TopicCloudViewModel(topics, this.topicDetail);
    }

    return TopicCloudWithDetailViewModel;
});