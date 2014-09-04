/*
 * TopicCloud View
 *
 * Responsibility:
 *      Renders a collection of Topics to the DOM, wiring their click events to a topicDetailView
 * Collaborators:
 *      TagView, TopicDetailView
 */

define(function(require) {
    var TagView = require('./TagView');

    function TopicCloudView($element, topics, topicDetailView) {
        this.$element = $element;
        this.tags = $.map(topics,
            function (eachTopic) {
                return new TagView(
                    $element,
                    eachTopic.asTag(),
                    function() { topicDetailView.selectTopic(eachTopic); });
            }
        );
    }

    TopicCloudView.prototype.render = function() {
        this.$element.empty();
        $.each(this.tags, function (i, ea) { ea.render(); });
    };

    return TopicCloudView;
});