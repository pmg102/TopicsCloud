/*
 * TopicDetail Presenter
 *
 * Responsibility:
 *      Render details of a Topic into the DOM
 * Collaborators:
 *      Topics
 *      Binds to a DOM element that must already contain:
            <p class="no-details"></p>
            <p class="show-details">
                <b class="topic-name">
                </b><b class="total"></b><b class="positive"></b><b class="neutral"></b><b class="negative"></b></p>
 */

define(function() {

    function TopicDetailPresenter($element, topics) {
        this.$element = $element;
        this.selectedTopic = null;
    }

    TopicDetailPresenter.prototype.selectTopic = function(topic) {
        this.selectedTopic = topic;
        this.render();
    };

    TopicDetailPresenter.prototype.render = function() {
        if (this.selectedTopic === null) {
            this.$element.find('.show-details').hide();
            this.$element.find('.no-details').show();
        }
        else {
            this.$element.find('.no-details').hide();
            this.$element.find('.topic-name').text(this.selectedTopic.label);
            this.$element.find('.total').text(this.selectedTopic.volume);
            this.$element.find('.positive').text(this.selectedTopic.sentiment.positive || 0);
            this.$element.find('.neutral').text(this.selectedTopic.sentiment.neutral || 0);
            this.$element.find('.negative').text(this.selectedTopic.sentiment.negative || 0);
            this.$element.find('.show-details').show();
        }
    };

    return TopicDetailPresenter;
});