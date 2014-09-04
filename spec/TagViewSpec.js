define(function(require) {
    var Sentiment = require('../js/models/Sentiment');
    var TagView = require('../js/views/TagView');

    describe('Tag View', function() {
        beforeEach(function() {
            var that = this;
            this._tag = { label: 'testLabel', getSize: function() { return 5; }, sentimentType: Sentiment.NEUTRAL };
            this.$element = $('<p></p>');
        });

        it('renders correctly', function() {
            var tagView = new TagView(this.$element, this._tag, function() {});
            tagView.render();
            expect(this.$element.html()).toEqual('<a href="#" class="neutral size-5">testLabel</a>');
        });

        it('handles and propagates click event', function() {
            var wasClicked = false;
            var tagView = new TagView(this.$element, this._tag, function() { wasClicked = true; });
            tagView.render();
            this.$element.find('a').click();
            expect(wasClicked).toBeTruthy();
        });

    });

});