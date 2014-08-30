// Model

function Topic(topicData) {
    $.extend(this, topicData);
    Topic._maxSentiment = Math.max(Topic._maxSentiment, this.volume);
}

Topic._maxSentiment = 0;

Topic.prototype.asTag = function() {
    var that = this;

    return {
        label: that.label,
        getSize: function() { return Math.ceil(that.volume * 6 / Topic._maxSentiment) || 1; },
        class: that.sentimentScore < 40 ? 'negative' : that.sentimentScore > 60 ? 'positive' : 'neutral'
    };
};


// View/Controllers

function TagView($element, tag, onClick) {
    this.$element = $element;
    $.extend(this, tag);
    this.size = this.getSize();
    this.onClick = onClick;
}

TagView.prototype.render = function() {
    $('<a href="#"></a>')
        .text(this.label)
        .addClass(this.class+' size-'+this.size)
        .click(this.onClick)
        .appendTo(this.$element);
};

function TagCloudView($element, topics, tagDetailView) {
    this.$element = $element;
    this.tags = $.map(
        topics,
        function (eachTopic) {
            return new TagView($element, eachTopic.asTag(), function() { tagDetailView.selectTopic(eachTopic.id); return false; });
        }
    );
}

TagCloudView.prototype.render = function() {
    this.$element.empty();
    $.each(this.tags, function (i, ea) { ea.render(); });
};

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

function TopicCloudView($element, topics) {
    this.topicDetailView = new TopicDetailView($element.find('#topic-details'), topics);
    this.topicCloudView = new TagCloudView($element.find('#topic-cloud'), topics, this.topicDetailView);
}

TopicCloudView.prototype.render = function() {
    this.topicCloudView.render();
    this.topicDetailView.render();
};

