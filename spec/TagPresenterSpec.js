define(function(require) {
    var Sentiment = require('../js/models/Sentiment');
    var TagPresenter = require('../js/presenters/TagPresenter');

    describe('Tag Presenter', function() {
        beforeEach(function() {
            var that = this;
            this._tag = { label: 'testLabel', getSize: function() { return 5; }, sentimentType: Sentiment.NEUTRAL };
            this.$element = $('<p></p>');
        });

        it('renders correctly', function() {
            var tagView = new TagPresenter(this.$element, this._tag, function() {});
            tagView.render();
            var $link = this.$element.find('a');
            expect($link).toExist();
            expect($link).toBeMatchedBy('a');
            expect($link).toHaveClass('neutral');
            expect($link).toHaveClass('size-5');
            expect($link).toHaveText('testLabel');
        });

        it('handles and propagates click event', function() {
            var wasClicked = false;
            var tagView = new TagPresenter(this.$element, this._tag, function() { wasClicked = true; });
            tagView.render();
            this.$element.find('a').click();
            expect(wasClicked).toBeTruthy();
        });

    });

});