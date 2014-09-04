define(function(require) {
    var Sentiment = require('../js/models/Sentiment');
    var TopicCloudView = require('../js/views/TopicCloudView');

    describe('Topic Cloud View', function() {
        beforeEach(function() {
            var that = this;
            this._tag1 = { label: 'testLabel', getSize: function() { return 5; }, sentimentType: Sentiment.NEUTRAL };
            this._tag2 = { label: 'test2Label', getSize: function() { return 3; }, sentimentType: Sentiment.POSITIVE };
            this._topics = [
                { id: 5, asTag: function() { return that._tag1; } },
                { id: 7, asTag: function() { return that._tag2; } }
            ];
            this._topicDetailView = {
                _idSelected: null,
                selectTopic: function(id) { this._idSelected = id; }
            };
            this.$element = $('<p></p>');
        });

        it('renders correctly', function() {
            var topicCloudView = new TopicCloudView(this.$element, this._topics, this._topicDetailView);
            topicCloudView.render();
            expect(this.$element.html())
                .toEqual('<a href="#" class="neutral size-5">testLabel</a>' +
                    '<a href="#" class="positive size-3">test2Label</a>');
        });

        it('handles and propagates the correct click event', function() {
            var topicCloudView = new TopicCloudView(this.$element, this._topics, this._topicDetailView);
            topicCloudView.render();
            this.$element.find('a').eq(0).click();
            expect(this._topicDetailView._idSelected).toEqual(5);
            this.$element.find('a').eq(1).click();
            expect(this._topicDetailView._idSelected).toEqual(7);
        });

    });

});