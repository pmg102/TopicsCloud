var modelTests = {

    _makeTopics: function(topicsData) {
        return $.map(topicsData, function(ea) { return new Topic(ea); });
    },

    testTopicVolumeEqualsTotalSentiment: function() {
        $.each(this._makeTopics(__DATA.topics), function (idx, topic) {
            TestRunner.assertEquals(
                (topic.sentiment.negative || 0) + (topic.sentiment.positive || 0) + (topic.sentiment.neutral || 0),
                topic.volume);
        });
    },

    testMaxSentimentIsComputed: function() {
        Topic._maxSentiment = 0;
        var topics = this._makeTopics([{volume: 12}, {volume: 8}, {volume: 27}, {volume: 2}]);
        TestRunner.assertEquals(27, Topic._maxSentiment);
    },

    testTagSizeCalculatedCorrectly: function() {
        var topics = this._makeTopics([{volume: 0}, {volume: 5}, {volume: 60}, {volume: 10}, {volume: 15}, {volume: 45}, {volume: 59}, {volume: 9}]);
        TestRunner.assertEquals(1, topics[0].asTag().getSize());
        TestRunner.assertEquals(1, topics[1].asTag().getSize());
        TestRunner.assertEquals(6, topics[2].asTag().getSize());
        TestRunner.assertEquals(1, topics[3].asTag().getSize());
        TestRunner.assertEquals(2, topics[4].asTag().getSize());
        TestRunner.assertEquals(5, topics[5].asTag().getSize());
        TestRunner.assertEquals(6, topics[6].asTag().getSize());
        TestRunner.assertEquals(1, topics[7].asTag().getSize());
    },

    testTagClassCalculatedCorrectly: function() {
        var topics = this._makeTopics([{sentimentScore: 30}, {sentimentScore: 40}, {sentimentScore: 50}, {sentimentScore: 60}, {sentimentScore: 70}]);
        TestRunner.assertEquals('negative', topics[0].asTag().class);
        TestRunner.assertEquals('neutral', topics[1].asTag().class);
        TestRunner.assertEquals('neutral', topics[2].asTag().class);
        TestRunner.assertEquals('neutral', topics[3].asTag().class);
        TestRunner.assertEquals('positive', topics[4].asTag().class);
    }
};

var controllerTests = {
    setUp: function() {
        var that = this;
        this._tag1 = { label: 'testLabel', getSize: function() { return 5; }, class: 'neutral' };
        this._tag2 = { label: 'test2Label', getSize: function() { return 3; }, class: 'positive' };
        this._topics = [
            { id: 5, asTag: function() { return that._tag1; } },
            { id: 7, asTag: function() { return that._tag2; } }
        ];
        this._tagDetailView = {
            _idSelected: null,
            selectTopic: function(id) { this._idSelected = id; }
        };
        this.$element = $('<p></p>');
    },

    testTagViewRendersCorrectly: function() {
        var tagView = new TagView(this.$element, this._tag1, function() {});
        tagView.render();
        TestRunner.assertEquals('<a href="#" class="neutral size-5">testLabel</a>', this.$element.html());
    },

    testTagViewClickEventIsHandled: function() {
        var wasClicked = false;
        var tagView = new TagView(this.$element, this._tag1, function() { wasClicked = true; });
        tagView.render();
        this.$element.find('a').click();
        TestRunner.assertEquals(true, wasClicked);
    },

    testTagCloudViewRendersCorrectly: function() {
        var tagCloudView = new TagCloudView(this.$element, this._topics, this._tagDetailView);
        tagCloudView.render();
        TestRunner.assertEquals(
            '<a href="#" class="neutral size-5">testLabel</a><a href="#" class="positive size-3">test2Label</a>',
            this.$element.html());
    },

    testTagCloudViewCorrectClickEventIsPropagated: function() {
        var tagCloudView = new TagCloudView(this.$element, this._topics, this._tagDetailView);
        tagCloudView.render();
        this.$element.find('a').eq(0).click();
        TestRunner.assertEquals(this._topics[0].id, this._tagDetailView._idSelected);
        this.$element.find('a').eq(1).click();
        TestRunner.assertEquals(this._topics[1].id, this._tagDetailView._idSelected);
    }
};

var tagDetailViewTests = {
    setUp: function() {
        this._topics = [
            new Topic({   "id": 3,
                "label": "testLabel1",
                "volume": 18,
                "sentiment": { "negative": 3, "neutral": 6, "positive": 9 },
            }),
            new Topic({   "id": 7,
                "label": "testLabel2",
                "volume": 32,
                "sentiment": { "negative": 3, "positive": 29 },
            })];

        this.$element = $('<p></p>');
        this.$element.append('<p class="no-details"></p>' +
            '<p class="show-details">' +
                '<b class="topic-name"></b><b class="total"></b><b class="positive"></b><b class="neutral"></b><b class="negative"></b>' +
            '</p>');

        this.topicDetailView = new TopicDetailView(this.$element, this._topics);
    },

    testTopicDetailViewInitiallyShowsInstructions: function() {
        this.topicDetailView.render();
        TestRunner.assertEquals('block', this.$element.find('.no-details').css('display'));
        TestRunner.assertEquals('none', this.$element.find('.show-details').css('display'));
    },

    testTopicDetailViewUpdatesToCorrectTopic: function() {
        this.topicDetailView.selectTopic(7);
        this.topicDetailView.render();
        TestRunner.assertEquals('none', this.$element.find('.no-details').css('display'));
        TestRunner.assertEquals('block', this.$element.find('.show-details').css('display'));
        TestRunner.assertEquals('testLabel2', this.$element.find('.show-details .topic-name').text());
        TestRunner.assertEquals('32', this.$element.find('.show-details .total').text());
        TestRunner.assertEquals('29', this.$element.find('.show-details .positive').text());
        TestRunner.assertEquals('0', this.$element.find('.show-details .neutral').text());
        TestRunner.assertEquals('3', this.$element.find('.show-details .negative').text());
    },

    _:0
};

TestRunner.run(modelTests);
TestRunner.run(controllerTests);
TestRunner.run(tagDetailViewTests);
