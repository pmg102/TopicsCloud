/*
 * TopicDetail ViewModel
 *
 * Responsibility:
 *      Render details of a Topic into the DOM
 * Collaborators:
 *      Topics
 */

define(function() {

    function TopicDetailViewModel(topics) {
        this.selectedTopic = ko.observable(null);
    }

    TopicDetailViewModel.prototype.selectTopic = function(topic) {
        this.selectedTopic( {
            name: topic.label,
            totalMentions: topic.volume,
            positiveMentions: topic.sentiment.positive || 0,
            neutralMentions: topic.sentiment.neutral || 0,
            negativeMentions: topic.sentiment.negative || 0
        } );
    };

    return TopicDetailViewModel;
});