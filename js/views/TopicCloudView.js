/*
 * TopicCloud View
 *
 * Responsibility:
 *      Renders a collection of Topics to the DOM, wiring their click events to a topicDetailView
 * Collaborators:
 *      TopicView, TopicDetailView
 */

define(function(require) {
    var TopicView = require('./TopicView');

    var TopicCloudView = Backbone.Marionette.CompositeView.extend({
        tagName: "p",
        template: _.template(''),
        itemView: TopicView
    });

    return TopicCloudView;
});