define(function(require) {
    var TopicCollection = require('../js/models/TopicCollection');
    var Sentiment = require('../js/models/Sentiment');

    describe('TopicCollection model', function() {
        it('correctly calculates the maximum volume', function() {
            var topicCollection = new TopicCollection([{volume: 12}, {volume: 8}, {volume: 27}, {volume: 2}]);
            expect(topicCollection._maxVolume).toBe(27);
        });
    });

    describe('Topic model', function() {
        function _makeTopics(topicsData) {
            return new TopicCollection(topicsData).asArray();
        }

        it('always has volume equal to total sentiment', function() {
            $.each(_makeTopics(__DATA.topics), function (idx, topic) {
                expect(topic.volume)
                    .toEqual((topic.sentiment.negative || 0) + (topic.sentiment.positive || 0) + (topic.sentiment.neutral || 0));
            });
        });

        it('calculates tag size correctly', function() {
            var topics = _makeTopics(
                [{volume: 0}, {volume: 5}, {volume: 60}, {volume: 10}, {volume: 15}, {volume: 45}, {volume: 59}, {volume: 9}]);

            expect(topics[0].asTag().getSize()).toEqual(1);
            expect(topics[1].asTag().getSize()).toEqual(1);
            expect(topics[2].asTag().getSize()).toEqual(6);
            expect(topics[3].asTag().getSize()).toEqual(1);
            expect(topics[4].asTag().getSize()).toEqual(2);
            expect(topics[5].asTag().getSize()).toEqual(5);
            expect(topics[6].asTag().getSize()).toEqual(6);
            expect(topics[7].asTag().getSize()).toEqual(1);
        });

        it('calculates tag sentiment correctly', function() {
            var topics = _makeTopics(
                [{sentimentScore: 30}, {sentimentScore: 40}, {sentimentScore: 50}, {sentimentScore: 60}, {sentimentScore: 70}]);

            expect(topics[0].asTag().sentimentType).toEqual(Sentiment.NEGATIVE);
            expect(topics[1].asTag().sentimentType).toEqual(Sentiment.NEUTRAL);
            expect(topics[2].asTag().sentimentType).toEqual(Sentiment.NEUTRAL);
            expect(topics[3].asTag().sentimentType).toEqual(Sentiment.NEUTRAL);
            expect(topics[4].asTag().sentimentType).toEqual(Sentiment.POSITIVE);
        });

    });

});