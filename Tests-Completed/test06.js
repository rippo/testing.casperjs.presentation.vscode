casper.test.begin('React tests', 3, function (test) {

    casper.start('http://localhost:43504/react', function () {
        test.assertTitle('React - CasperJS Mvc');
    });

    casper.then(function () {
        test.assertTextExists('A great react title', 'The title exists');
    });

    casper.waitUntilVisible('.comment', function() {
        test.assertElementCount('.commentList > .comment > h2', 2, '2 comments have been found');
    });

    casper.run(function () {
        test.done();
    });
});

