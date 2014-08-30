function echo(string, isError) {
    $('#results').append('<p style="color:'+(isError?'red':'green')+'">'+string+'</p>');
}

TestRunner = {
    running: '',
    failed: false,

    assertEquals: function(expected, actual) {
        if (expected !== actual) {
            this.failed = true;
            echo(this.running + ': FAILED. Expected <b>' + $('<p/>').text(expected).html() + '</b> but got <b>' + $('<p/>').text(actual).html() + "</b>", true);
        }
    },

    run: function(suite) {
        for (var k in suite) {
            if (suite.hasOwnProperty(k) && typeof suite[k] === 'function' && k.lastIndexOf('test', 0) === 0) {
                this.running = k;
                if (typeof suite.setUp === 'function') suite.setUp();
                suite[k]();
                if (typeof suite.tearDown === 'function') suite.tearDown();

                if (!this.failed) echo(this.running + ': PASSED.');
                this.failed = false;
            }
        }
    }
};
