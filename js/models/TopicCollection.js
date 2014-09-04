/*
 * Topic Collection Model
 *
 * Responsibility:
 *      model a collection of topics, keeping track of the maximum volume seen to allow topics to
 *      calculate their proportional volume
 * Collaborators:
 *      manages a collection of Topics
 */

define(function(require) {
    var Topic = require('./Topic');

    function TopicCollection(topicsData) {
        // This is precalculated for speed, so will NOT be updated by changes to Topics within the Collection
        this._maxVolume = Math.max.apply(null,
            $.map(topicsData, function (each) { return each.volume; }));

        var that = this;
        this._topics = $.map(topicsData, function (each) {
            return new Topic(each, that);
        });
    }

    TopicCollection.prototype.calculateProportionalVolume = function(volume) {
        return volume / this._maxVolume;
    };

    TopicCollection.prototype.asArray = function() {
        return this._topics;
    };

    return TopicCollection;
});