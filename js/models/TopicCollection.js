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

    var TopicCollection = Backbone.Collection.extend({
        model: Topic,

        initialize: function(topics){
            var self = this;
            this.models = topics;
            self._setChildSizes();
            this.on('add', function(topic){
                self._setChildSizes();
            });
        },

        // FIXME: This code properly wants to live on TopicCloudView
        _setChildSizes: function() {
            var maxVolume = Math.max.apply(null,
                this.map(function (each) {
                    return each.get('volume'); }));

            this.each(function(topic) {
                topic.set('size', Math.ceil((topic.get('volume') / maxVolume) * 6) || 1);
            });
        }
    });

    return TopicCollection;
});