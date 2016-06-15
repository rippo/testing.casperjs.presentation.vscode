var failures404 = [];

casper.test.begin('Missing resources', 1, {

    setUp: function () {
        // Attach the resource listener
        casper.on('resource.received', this.onResourceReceived);
    },

    tearDown: function () {
        // Remove the resource listener
        casper.removeListener('resource.received', this.onResourceReceived);
    },

    test: function (test) {
        casper.start(casper.cli.options.baseUrl + '/home/missingresources', function () {
            test.assertTextExists('Missing Images', 'Missing Images is present on page');
        });

        casper.run(function () {
            failures404.forEach(function (item) {
                //doThrow: false, don't stop on first failure
                test.fail(item, { doThrow: false });
            });

            test.done();
        });
    },

    onResourceReceived: function (resource) {
        if (resource.stage === 'end' && resource.status === 404) {
            //require('utils').dump(resource);
            failures404.push('404 for ' + resource.url);
        }
    }
});