/*
 * TopicDetail View
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

    function TopicDetailView($element, topics) {
        this.$element = $element;
        this.topics = [];
        var that = this;
        $.each(topics, function(i, each) { that.topics[each.id] = each; });
        this.selectedTopic = null;
    }

    TopicDetailView.prototype.selectTopic = function(topicId) {
        this.selectedTopic = this.topics[topicId];
        this.render();
    };

    TopicDetailView.prototype.render = function() {
        if (!this.selectedTopic) {
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

    return TopicDetailView;
});