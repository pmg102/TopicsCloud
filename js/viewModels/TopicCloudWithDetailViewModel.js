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

    function TopicCloudWithDetailViewModel($element, topics) {
        this.topicDetailViewModel = new TopicDetailViewModel($element.find('#topic-details'), topics);
        this.topicCloudView = new TopicCloudViewModel($element.find('#topic-cloud'), topics, this.topicDetailViewModel);
    }

    TopicCloudWithDetailViewModel.prototype.render = function() {
        this.topicCloudView.render();
        this.topicDetailViewModel.render();
    };

    return TopicCloudWithDetailViewModel;
});