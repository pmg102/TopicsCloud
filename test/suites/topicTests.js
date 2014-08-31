define(function(require) {

    var Sentiment = require('../../js/models/Sentiment');
    var Topic = require('../../js/models/Topic');
    var TopicCollection = require('../../js/models/TopicCollection');

    return {

        _makeTopicCollection: function(topicsData) {
            return new TopicCollection(topicsData);
        },

        _makeTopics: function(topicsData) {
            return this._makeTopicCollection(topicsData).asArray();
        },

        testTopicVolumeEqualsTotalSentiment: function() {
            $.each(this._makeTopics(__DATA.topics), function (idx, topic) {
                TestRunner.assertEquals(
                    (topic.sentiment.negative || 0) + (topic.sentiment.positive || 0) + (topic.sentiment.neutral || 0),
                    topic.volume);
            });
        },

        testMaxVolumeIsComputed: function() {
            var topicCollection = this._makeTopicCollection([{volume: 12}, {volume: 8}, {volume: 27}, {volume: 2}]);
            TestRunner.assertEquals(27, topicCollection._maxVolume);
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

        testTagSentimentCalculatedCorrectly: function() {
            var topics = this._makeTopics([{sentimentScore: 30}, {sentimentScore: 40}, {sentimentScore: 50}, {sentimentScore: 60}, {sentimentScore: 70}]);
            TestRunner.assertEquals(Sentiment.NEGATIVE, topics[0].asTag().sentimentType);
            TestRunner.assertEquals(Sentiment.NEUTRAL, topics[1].asTag().sentimentType);
            TestRunner.assertEquals(Sentiment.NEUTRAL, topics[2].asTag().sentimentType);
            TestRunner.assertEquals(Sentiment.NEUTRAL, topics[3].asTag().sentimentType);
            TestRunner.assertEquals(Sentiment.POSITIVE, topics[4].asTag().sentimentType);
        }
    };

});