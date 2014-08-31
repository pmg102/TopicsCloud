define(function(require) {
    TestRunner.runAll([
        require('suites/topicTests'),
        require('suites/tagAndTopicCloudTests'),
        require('suites/topicDetailTests')
    ]);
});