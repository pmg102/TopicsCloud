define(function(require) {
    var Topic = require('../js/models/Topic');
    var TopicDetailViewModel = require('../js/viewModels/TopicDetailViewModel');

    describe('Topic Detail ViewModel', function() {
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

            this.topicDetailViewModel = new TopicDetailViewModel(this.$element, this._topics);
        });

        it('initially shows instructions pane', function() {
            this.topicDetailViewModel.render();

            expect(this.$element.find('.no-details').css('display')).toEqual('block');
            expect(this.$element.find('.show-details').css('display')).toEqual('none');
        });

        it('updates to the selected topic', function() {
            this.topicDetailViewModel.selectTopic(7);
            this.topicDetailViewModel.render();

            expect(this.$element.find('.no-details').css('display')).toEqual('none');
            expect(this.$element.find('.show-details').css('display')).toEqual('block');
            expect(this.$element.find('.show-details .topic-name').text()).toEqual('testLabel2');
            expect(this.$element.find('.show-details .total').text()).toEqual('32');
            expect(this.$element.find('.show-details .positive').text()).toEqual('29');
            expect(this.$element.find('.show-details .neutral').text()).toEqual('0');
            expect(this.$element.find('.show-details .negative').text()).toEqual('3');
        });
    });

});