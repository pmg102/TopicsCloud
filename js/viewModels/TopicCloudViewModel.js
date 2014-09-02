/*
 * TopicCloud ViewModel
 *
 * Responsibility:
 *      Renders a collection of Topics to the DOM, wiring their click events to a topicDetailViewModel
 * Collaborators:
 *      TagViewModel, TopicDetailViewModel
 */

define(function(require) {
    var TagViewModel = require('./TagViewModel');

    function TopicCloudViewModel(topics, topicDetailViewModel) {
        this.tags = ko.observableArray($.map(topics,
            function (eachTopic) {
                return new TagViewModel(
                    eachTopic.asTag(),
                    function() { topicDetailViewModel.selectTopic(eachTopic); });
            }
        ));
    }

    return TopicCloudViewModel;
});