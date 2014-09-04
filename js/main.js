define(function(require) {
    var Topic = require('./models/Topic');
    var TopicCollection = require('./models/TopicCollection');
    var TopicCloudWithDetailApp = require('./views/TopicCloudWithDetailApp');

    function onLoadTopics(data) {
        var topics = _.map(data.topics, function(each) { return new Topic(each); });
        TopicCloudWithDetailApp.start(new TopicCollection(topics));
    }

    // Workaround blocked XHR loading JSON from file://
    //$.getJSON('res/topics.json', onLoadTopics);
    onLoadTopics(__DATA);
});
