/*
 * TopicCloud Presenter
 *
 * Responsibility:
 *      Renders a collection of Topics to the DOM, wiring their click events to a topicDetailPresenter
 * Collaborators:
 *      TagPresenter, TopicDetailPresenter
 */

define(function(require) {
    var TagPresenter = require('./TagPresenter');

    function TopicCloudPresenter($element, topics, topicDetailPresenter) {
        this.$element = $element;
        this.tags = $.map(topics,
            function (eachTopic) {
                return new TagPresenter(
                    $element,
                    eachTopic.asTag(),
                    function() { topicDetailPresenter.selectTopic(eachTopic); return false; });
            }
        );
    }

    TopicCloudPresenter.prototype.render = function() {
        this.$element.empty();
        $.each(this.tags, function (i, ea) { ea.render(); });
    };

    return TopicCloudPresenter;
});