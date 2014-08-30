
function onLoadTopics(data) {
    var topics = $.map(data.topics, function (each) { return new Topic(each); });
    new TopicCloudView($('#topic-view'), topics).render();
}

// Workaround blocked XHR loading JSON from file://
//$.getJSON('res/topics.json', onLoadTopics);
onLoadTopics(__DATA);