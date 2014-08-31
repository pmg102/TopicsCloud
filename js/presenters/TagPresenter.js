/*
 * Tag Presenter
 *
 * Responsibility:
 *      Renders a Tag onto a DOM element and binds a click to a handler
 * Collaborators:
 *      Tag, jQuery
 */

define(function() {

    function TagPresenter($element, tag, onClick) {
        this.$element = $element;
        $.extend(this, tag);
        this.size = this.getSize();
        this.onClick = onClick;
    }

    TagPresenter.prototype.render = function() {
        $('<a href="#"></a>')
            .text(this.label)
            .addClass(this.class+' size-'+this.size)
            .click(this.onClick)
            .appendTo(this.$element);
    };

    return TagPresenter;
});