/*
 * Tag Presenter
 *
 * Responsibility:
 *      Renders a Tag onto a DOM element and binds a click to a handler
 * Collaborators:
 *      Tag, jQuery
 */

define(function(require) {
    var Sentiment = require('../models/Sentiment');

    function TagPresenter($element, tag, onClick) {
        this.$element = $element;
        this.tag = tag;
        this.onClick = onClick;
    }

    TagPresenter.prototype._sentimentTypeAsClass = function() {
        switch (this.tag.sentimentType) {
            case Sentiment.POSITIVE: return 'positive';
            case Sentiment.NEGATIVE: return 'negative';
            default: return 'neutral';
        }
    };

    TagPresenter.prototype.render = function() {
        $('<a href="#"></a>')
            .text(this.tag.label)
            .addClass(this._sentimentTypeAsClass() + ' size-' + this.tag.getSize())
            .click(this.onClick)
            .appendTo(this.$element);
    };

    return TagPresenter;
});