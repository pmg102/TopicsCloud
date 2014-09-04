define(function(require) {
    var Sentiment = require('../js/models/Sentiment');
    var TopicCloudView = require('../js/views/TopicCloudView');

    describe('Topic Cloud View', function() {
        beforeEach(function() {
            this._tag1 = { label: 'testLabel', getSize: function() { return 5; }, sentimentType: Sentiment.NEUTRAL };
            this._tag2 = { label: 'test2Label', getSize: function() { return 3; }, sentimentType: Sentiment.POSITIVE };
            this._topics = [
                _.extend(this._tag1,{ id: 5 }),
                _.extend(this._tag2,{ id: 7 })
            ];
            this._topicDetailView = {
                _idSelected: null,
                selectTopic: function(topic) { this._idSelected = topic.id; }
            };
            this.$element = $('<p></p>');
        });

        it('renders correctly', function() {
            var topicCloudView = new TopicCloudView(this.$element, this._topics, this._topicDetailView);
            topicCloudView.render();

            var links = this.$element.find('a');
            expect(links.length).toEqual(2);
            expect($(links[0])).toBeMatchedBy('a');
            expect($(links[0])).toHaveClass('neutral');
            expect($(links[0])).toHaveClass('size-5');
            expect($(links[0])).toHaveText('testLabel');

            expect($(links[1])).toBeMatchedBy('a');
            expect($(links[1])).toHaveClass('positive');
            expect($(links[1])).toHaveClass('size-3');
            expect($(links[1])).toHaveText('test2Label');
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