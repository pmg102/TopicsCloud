/*
 * TopicDetail View
 *
 * Responsibility:
 *      Render details of a Topic into the DOM
 * Collaborators:
 *      Topics
 *      Binds to a DOM element that must already contain:
            <p class="no-details"></p>
            <p class="show-details">
                <b class="topic-name">
                </b><b class="total"></b><b class="positive"></b><b class="neutral"></b><b class="negative"></b></p>
 */

define(function() {

    var TopicDetailView = Backbone.Marionette.ItemView.extend({
        template: "#detail-template",
        tagName: 'p',

        initialize: function(options){
            this._update( options.collection.models[0] );
            this.listenTo(Backbone, "topicSelected", this._update);
        },

        _update: function(model){
            this.model = model;
            this.render();
            this.$('.show-details').show();
            this.$('.no-details').hide();
        }
    });

    return TopicDetailView;
});