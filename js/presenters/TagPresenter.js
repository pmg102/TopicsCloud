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
        $.extend(this, tag);
        this.size = this.getSize();
        this.onClick = onClick;
    }

    TagPresenter.prototype._sentimentTypeAsClass = function() {
        switch (this.sentimentType) {
            case Sentiment.POSITIVE: return 'positive';
            case Sentiment.NEGATIVE: return 'negative';
            default: return 'neutral';
        }
    }

    TagPresenter.prototype.render = function() {
        $('<a href="#"></a>')
            .text(this.label)
            .addClass(this._sentimentTypeAsClass() + ' size-' + this.size)
            .click(this.onClick)
            .appendTo(this.$element);
    };

    return TagPresenter;
});