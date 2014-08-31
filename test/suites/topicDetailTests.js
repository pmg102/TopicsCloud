define(function(require) {
    var Topic = require('../../js/models/Topic');
    var TopicDetailPresenter = require('../../js/presenters/TopicDetailPresenter');

    return {
        setUp: function() {
            this._topics = [
                new Topic({   "id": 3,
                    "label": "testLabel1",
                    "volume": 18,
                    "sentiment": { "negative": 3, "neutral": 6, "positive": 9 }
                }),
                new Topic({   "id": 7,
                    "label": "testLabel2",
                    "volume": 32,
                    "sentiment": { "negative": 3, "positive": 29 }
                })];

            this.$element = $('<p></p>');
            this.$element.append('<p class="no-details"></p>' +
                '<p class="show-details">' +
                '<b class="topic-name"></b><b class="total"></b><b class="positive"></b><b class="neutral"></b><b class="negative"></b>' +
                '</p>');

            this.topicDetailPresenter = new TopicDetailPresenter(this.$element, this._topics);
        },

        testTopicDetailViewInitiallyShowsInstructions: function() {
            this.topicDetailPresenter.render();
            TestRunner.assertEquals('block', this.$element.find('.no-details').css('display'));
            TestRunner.assertEquals('none', this.$element.find('.show-details').css('display'));
        },

        testTopicDetailViewUpdatesToCorrectTopic: function() {
            this.topicDetailPresenter.selectTopic(7);
            this.topicDetailPresenter.render();
            TestRunner.assertEquals('none', this.$element.find('.no-details').css('display'));
            TestRunner.assertEquals('block', this.$element.find('.show-details').css('display'));
            TestRunner.assertEquals('testLabel2', this.$element.find('.show-details .topic-name').text());
            TestRunner.assertEquals('32', this.$element.find('.show-details .total').text());
            TestRunner.assertEquals('29', this.$element.find('.show-details .positive').text());
            TestRunner.assertEquals('0', this.$element.find('.show-details .neutral').text());
            TestRunner.assertEquals('3', this.$element.find('.show-details .negative').text());
        }

    };

});