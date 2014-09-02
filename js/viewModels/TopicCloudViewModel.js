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

    function TopicCloudViewModel($element, topics, topicDetailViewModel) {
        this.$element = $element;
        this.tags = $.map(topics,
            function (eachTopic) {
                return new TagViewModel(
                    $element,
                    eachTopic.asTag(),
                    function() { topicDetailViewModel.selectTopic(eachTopic.id); return false; });
            }
        );
    }

    TopicCloudViewModel.prototype.render = function() {
        this.$element.empty();
        $.each(this.tags, function (i, ea) { ea.render(); });
    };

    return TopicCloudViewModel;
});