/*
 * Tag View
 *
 * Responsibility:
 *      Renders a Tag onto a DOM element and binds a click to a handler
 * Collaborators:
 *      Tag, jQuery
 */

define(function(require) {
    var Sentiment = require('../models/Sentiment');

    var TopicView = Backbone.Marionette.ItemView.extend({
        template: "#tag-template",
        tagName: 'span',

        events: {
            'click': 'selectMe'
        },

        selectMe: function() {
            Backbone.trigger('topicSelected', this.model);
        }
    });

    return TopicView;
});