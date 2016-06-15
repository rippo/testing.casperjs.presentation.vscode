//Screen grabs on failures
casper.test.begin('Screen grabs', 4, function (test) {

    casper.start(casper.cli.options.baseUrl + '/home/contact', function () {
        test.assertTextExists('Contact Us', 'Contact us is present on page');
        //FILL FORM
        this.fillSelectors('form', {
            'input[name="ContactName"]': 'Richard Wilde'
        }, true);

    });

    //FILL FORM WITH INVALID EMAIL
    casper.waitForSelector('#EmailAddress', function() {
        test.assertTextExists('The Email Address field is required', 'Email required is shown');
        this.fillSelectors('form', {
           'input[name="EmailAddress"]': 'INVALID@EMAIL'
        }, true);
    });

    //FILL FORM WITH VALID EMAIL
    casper.waitForSelector('#EmailAddress', function() {
        test.assertTextExists('The Email Address field is not a valid e-mail address', 'Email validation message shown');
        this.fillSelectors('form', {
           //'input[name="EmailAddress"]': 'richard@wildesoft.net'
        }, true);
    });

    casper.waitForUrl('/home/thanks', function () {
        test.assertTextExists('Thanks', 'Thanks H1 header is shown');
    }, null, 1000);

    casper.run(function () {
        test.done();
    });

    var failures = [];
    casper.test.on('fail', function(failure) {
        //require('utils').dump(failure);
        var file = 'FAILED-' + failure.message.cleanup() + '.jpg';
        casper.capture(file);
    });
});

String.prototype.cleanup = function() {
    return this
        .toLowerCase()
        .replace(/[^A-Za-z\s]+/g, ' ')
        .replace(/  /g , ' ')
        .trim()
        .replace(/ /g, '-');
}