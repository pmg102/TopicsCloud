/*
 * TopicCloudWithDetail Presenter
 *
 * Responsibility:
 *      Combine a TopicCloudPresenter with a TopicDetailPresenter into a single connected view
 * Collaborators:
 *      TopicCloudPresenter, TopicDetailPresenter
 */

define(function(require) {
    var TopicDetailPresenter = require('./TopicDetailPresenter');
    var TopicCloudPresenter = require('./TopicCloudPresenter');

    function TopicCloudWithDetailPresenter($element, topics) {
        this.topicDetailPresenter = new TopicDetailPresenter($element.find('#topic-details'), topics);
        this.topicCloudView = new TopicCloudPresenter($element.find('#topic-cloud'), topics, this.topicDetailPresenter);
    }

    TopicCloudWithDetailPresenter.prototype.render = function() {
        this.topicCloudView.render();
        this.topicDetailPresenter.render();
    };

    return TopicCloudWithDetailPresenter;
});