define(function(require) {
    var Sentiment = require('../js/models/Sentiment');
    var TopicView = require('../js/views/TopicView');

    describe('Topic View', function() {
        beforeEach(function() {
            var that = this;
            this._topic = new Backbone.Model({ label: 'testLabel', size: 5, sentimentType: Sentiment.NEUTRAL });
        });

        xit('renders correctly', function() {
            var topicView = new TopicView(this._topic);
            // FIXME: mock Marionettes Template Cache
            topicView.render();
            var $link = topicView.$el.find('a');
            expect($link).toExist();
            expect($link).toBeMatchedBy('a');
            expect($link).toHaveClass('neutral');
            expect($link).toHaveClass('size-5');
            expect($link).toHaveText('testLabel');
        });

        xit('handles and propagates click event', function() {
            var selectedTopic = null;
            Backbone.on('topicSelected', function(topic) { selectedTopic = topic; });
            var topicView = new TopicView(this._topic);
            // FIXME: mock Marionettes Template Cache
            topicView.render();
            topicView.$el.find('a').click();
            expect(selectedTopic).not.toBeNull();
            expect(selectedTopic.get('label')).toEqual('testLabel');
        });

    });

});