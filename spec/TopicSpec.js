define(function(require) {
    var Topic = require('../js/models/Topic');
    var TopicCollection = require('../js/models/TopicCollection');
    var Sentiment = require('../js/models/Sentiment');

    function _makeTopics(topicsData) {
        var topics = _.map(topicsData, function(each) {
            return new Topic(_.extend({ sentiment: {} }, each));
        });
        return new TopicCollection(topics);
    }

    describe('TopicCollection model', function() {
        it('correctly sets the proportional sizes', function() {
            var topicCollection = _makeTopics([{volume: 12}, {volume: 8}, {volume: 27}, {volume: 2}]);
            expect(topicCollection.at(0).get('size')).toBe(3);
            expect(topicCollection.at(1).get('size')).toBe(2);
            expect(topicCollection.at(2).get('size')).toBe(6);
            expect(topicCollection.at(3).get('size')).toBe(1);
        });
    });

    describe('Topic model', function() {
        it('always has volume equal to total sentiment', function() {
            _makeTopics(__DATA.topics).each(function (topic) {
                expect(topic.get('volume'))
                    .toEqual((topic.get('sentiment').negative || 0) + (topic.get('sentiment').positive || 0) + (topic.get('sentiment').neutral || 0));
            });
        });

        it('calculates tag size correctly', function() {
            var topics = _makeTopics(
                [{volume: 0}, {volume: 5}, {volume: 60}, {volume: 10}, {volume: 15}, {volume: 45}, {volume: 59}, {volume: 9}]);

            expect(topics.at(0).get('size')).toEqual(1);
            expect(topics.at(1).get('size')).toEqual(1);
            expect(topics.at(2).get('size')).toEqual(6);
            expect(topics.at(3).get('size')).toEqual(1);
            expect(topics.at(4).get('size')).toEqual(2);
            expect(topics.at(5).get('size')).toEqual(5);
            expect(topics.at(6).get('size')).toEqual(6);
            expect(topics.at(7).get('size')).toEqual(1);
        });

        it('calculates tag sentiment correctly', function() {
            var topics = _makeTopics(
                [{sentimentScore: 30}, {sentimentScore: 40}, {sentimentScore: 50}, {sentimentScore: 60}, {sentimentScore: 70}]);

            expect(topics.at(0).get('sentimentType')).toEqual(Sentiment.NEGATIVE);
            expect(topics.at(1).get('sentimentType')).toEqual(Sentiment.NEUTRAL);
            expect(topics.at(2).get('sentimentType')).toEqual(Sentiment.NEUTRAL);
            expect(topics.at(3).get('sentimentType')).toEqual(Sentiment.NEUTRAL);
            expect(topics.at(4).get('sentimentType')).toEqual(Sentiment.POSITIVE);
        });

    });

});