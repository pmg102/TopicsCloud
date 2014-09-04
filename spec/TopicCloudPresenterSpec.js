define(function(require) {
    var Sentiment = require('../js/models/Sentiment');
    var TopicCloudPresenter = require('../js/presenters/TopicCloudPresenter');

    describe('Topic Cloud Presenter', function() {
        beforeEach(function() {
            var that = this;
            this._tag1 = { label: 'testLabel', getSize: function() { return 5; }, sentimentType: Sentiment.NEUTRAL };
            this._tag2 = { label: 'test2Label', getSize: function() { return 3; }, sentimentType: Sentiment.POSITIVE };
            this._topics = [
                { id: 5, asTag: function() { return that._tag1; } },
                { id: 7, asTag: function() { return that._tag2; } }
            ];
            this._topicDetailPresenter = {
                _idSelected: null,
                selectTopic: function(topic) { this._idSelected = topic.id; }
            };
            this.$element = $('<p></p>');
        });

        it('renders correctly', function() {
            var topicCloudPresenter = new TopicCloudPresenter(this.$element, this._topics, this._topicDetailPresenter);
            topicCloudPresenter.render();

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
            var topicCloudPresenter = new TopicCloudPresenter(this.$element, this._topics, this._topicDetailPresenter);
            topicCloudPresenter.render();
            this.$element.find('a').eq(0).click();
            expect(this._topicDetailPresenter._idSelected).toEqual(5);
            this.$element.find('a').eq(1).click();
            expect(this._topicDetailPresenter._idSelected).toEqual(7);
        });

    });

});