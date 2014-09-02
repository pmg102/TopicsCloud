/*
 * Tag ViewModel
 *
 * Responsibility:
 *      Renders a Tag onto a DOM element and binds a click to a handler
 * Collaborators:
 *      Tag, jQuery
 */

define(function(require) {
    var Sentiment = require('../models/Sentiment');

    function TagViewModel(tag, onClick) {
        this.tag = tag;
        this.size = this.tag.getSize();

        this.handleClick = onClick;
        this.label = ko.observable(this.tag.label);
        this.css = ko.observable(this._sentimentTypeAsClass() + ' size-' + this.size);
    }

    TagViewModel.prototype._sentimentTypeAsClass = function() {
        switch (this.tag.sentimentType) {
            case Sentiment.POSITIVE: return 'positive';
            case Sentiment.NEGATIVE: return 'negative';
            default: return 'neutral';
        }
    };

    return TagViewModel;
});