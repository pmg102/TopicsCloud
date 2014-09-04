/*
 * Tag View
 *
 * Responsibility:
 *      Renders a Tag onto a DOM element and binds a click to a handler
 * Collaborators:
 *      Tag, jQuery
 */

define(function(require) {
    var Sentiment = require('../models/Sentiment');

    function TagView($element, tag, onClick) {
        this.$element = $element;
        this.tag = tag;
        this.onClick = onClick;
    }

    TagView.prototype._sentimentTypeAsClass = function() {
        switch (this.tag.sentimentType) {
            case Sentiment.POSITIVE: return 'positive';
            case Sentiment.NEGATIVE: return 'negative';
            default: return 'neutral';
        }
    };

    TagView.prototype.render = function() {
        $('<a href="#"></a>')
            .text(this.tag.label)
            .addClass(this._sentimentTypeAsClass() + ' size-' + this.tag.getSize())
            .click(this.onClick)
            .appendTo(this.$element);
    };

    return TagView;
});