/*
 * Topic Model
 *
 * Responsibility:
 *      model a topic, and provide an Adaptor to allow a Topic to be used as a Tag
 * Collaborators:
 *      is a member of a TopicCollection
 */

define(function(require) {
    var Sentiment = require('./Sentiment');

    function sentimentTypeAsClass(sentimentType) {
        switch (sentimentType) {
            case Sentiment.POSITIVE: return 'positive';
            case Sentiment.NEGATIVE: return 'negative';
            default: return 'neutral';
        }
    }

    var Topic = Backbone.Model.extend({
        initialize: function(topicData) {
            var sentimentType = Sentiment.fromScore(topicData.sentimentScore);
            this.set('sentimentType', sentimentType);
            this.set('clazz', sentimentTypeAsClass(sentimentType));

            this.set('topicName', topicData.label);
            this.set('totalMentions', topicData.volume);
            this.set('positiveMentions', topicData.sentiment.positive || 0);
            this.set('neutralMentions', topicData.sentiment.neutral || 0);
            this.set('negativeMentions', topicData.sentiment.negative || 0);
        }
    });

    return Topic;
});