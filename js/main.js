define(function(require) {
    var TopicCollection = require('./models/TopicCollection');
    var TopicCloudWithDetailViewModel = require('./viewModels/TopicCloudWithDetailViewModel');

    function onLoadTopics(data) {
        var topics = new TopicCollection(data.topics).asArray();
        ko.applyBindings(new TopicCloudWithDetailViewModel(topics));
    }

    // Workaround blocked XHR loading JSON from file://
    //$.getJSON('res/topics.json', onLoadTopics);
    onLoadTopics(__DATA);
});
