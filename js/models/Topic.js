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
    function Topic(topicData, topicCollection) {
        $.extend(this, topicData);
        this._topicCollection = topicCollection;
    }

    Topic.prototype._calculateProportionalVolume = function() {
        return this._topicCollection.calculateProportionalVolume(this.volume);
    };

    Topic.prototype.asTag = function() {
        var that = this;

        return {
            label: that.label,
            getSize: function() {
                return Math.ceil(that._calculateProportionalVolume() * 6) || 1;
            },
            sentimentType: Sentiment.fromScore(that.sentimentScore)
        };
    };

    return Topic;
});