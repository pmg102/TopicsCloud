define(function(require) {

    var Sentiment = require('../../js/models/Sentiment');
    var TagPresenter = require('../../js/presenters/TagPresenter');
    var TopicCloudPresenter = require('../../js/presenters/TopicCloudPresenter');

    return {
        setUp: function() {
            var that = this;
            this._tag1 = { label: 'testLabel', getSize: function() { return 5; }, sentimentType: Sentiment.NEUTRAL };
            this._tag2 = { label: 'test2Label', getSize: function() { return 3; }, sentimentType: Sentiment.POSITIVE };
            this._topics = [
                { id: 5, asTag: function() { return that._tag1; } },
                { id: 7, asTag: function() { return that._tag2; } }
            ];
            this._topicDetailPresenter = {
                _idSelected: null,
                selectTopic: function(id) { this._idSelected = id; }
            };
            this.$element = $('<p></p>');
        },

        testTagViewRendersCorrectly: function() {
            var tagView = new TagPresenter(this.$element, this._tag1, function() {});
            tagView.render();
            TestRunner.assertEquals('<a href="#" class="neutral size-5">testLabel</a>', this.$element.html());
        },

        testTagViewClickEventIsHandled: function() {
            var wasClicked = false;
            var tagView = new TagPresenter(this.$element, this._tag1, function() { wasClicked = true; });
            tagView.render();
            this.$element.find('a').click();
            TestRunner.assertEquals(true, wasClicked);
        },

        testTopicCloudViewRendersCorrectly: function() {
            var topicCloudPresenter = new TopicCloudPresenter(this.$element, this._topics, this._topicDetailPresenter);
            topicCloudPresenter.render();
            TestRunner.assertEquals(
                '<a href="#" class="neutral size-5">testLabel</a><a href="#" class="positive size-3">test2Label</a>',
                this.$element.html());
        },

        testTopicCloudViewCorrectClickEventIsPropagated: function() {
            var topicCloudPresenter = new TopicCloudPresenter(this.$element, this._topics, this._topicDetailPresenter);
            topicCloudPresenter.render();
            this.$element.find('a').eq(0).click();
            TestRunner.assertEquals(this._topics[0].id, this._topicDetailPresenter._idSelected);
            this.$element.find('a').eq(1).click();
            TestRunner.assertEquals(this._topics[1].id, this._topicDetailPresenter._idSelected);
        }
    };

});