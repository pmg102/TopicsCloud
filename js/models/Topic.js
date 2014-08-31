/*
 * Topic Model
 *
 * Responsibility:
 *      model a topic, and provide an Adaptor to allow a Topic to be used as a Tag
 * Collaborators:
 *      is a member of a TopicCollection
 */

define(function() {
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
            getSize: function() { return Math.ceil(that._calculateProportionalVolume() * 6) || 1; },
            class: that.sentimentScore < 40 ? 'negative' : that.sentimentScore > 60 ? 'positive' : 'neutral'
        };
    };

    return Topic;
});