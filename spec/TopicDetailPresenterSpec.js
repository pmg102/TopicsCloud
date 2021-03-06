define(function(require) {
    var Topic = require('../js/models/Topic');
    var TopicDetailPresenter = require('../js/presenters/TopicDetailPresenter');

    describe('Topic Detail Presenter', function() {
        beforeEach(function() {
            this._topics = [
                new Topic({   "id": 3,
                    "label": "testLabel1",
                    "volume": 18,
                    "sentiment": { "negative": 3, "neutral": 6, "positive": 9 }
                }),
                new Topic({   "id": 7,
                    "label": "testLabel2",
                    "volume": 32,
                    "sentiment": { "negative": 3, "positive": 29 }
                })];

            this.$element = $('<p></p>');
            this.$element.append('<p class="no-details"></p>' +
                '<p class="show-details">' +
                '<b class="topic-name"></b><b class="total"></b><b class="positive"></b><b class="neutral"></b><b class="negative"></b>' +
                '</p>');

            // must attach to the DOM for visibility checks to work:
            $('body').append(this.$element);

            this.topicDetailPresenter = new TopicDetailPresenter(this.$element, this._topics);
        });

        it('initially shows instructions pane', function() {
            this.topicDetailPresenter.render();

            expect(this.$element.find('.no-details')).not.toBeHidden();
            expect(this.$element.find('.show-details')).toBeHidden();
        });

        it('updates to the selected topic', function() {
            this.topicDetailPresenter.selectTopic(this._topics[1]);
            this.topicDetailPresenter.render();

            expect(this.$element.find('.no-details')).toBeHidden();
            expect(this.$element.find('.show-details')).not.toBeHidden();
            expect(this.$element.find('.show-details .topic-name')).toHaveText('testLabel2');
            expect(this.$element.find('.show-details .total')).toHaveText('32');
            expect(this.$element.find('.show-details .positive')).toHaveText('29');
            expect(this.$element.find('.show-details .neutral')).toHaveText('0');
            expect(this.$element.find('.show-details .negative')).toHaveText('3');
        });
    });

});