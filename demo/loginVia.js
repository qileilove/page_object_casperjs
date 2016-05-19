/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/
phantom.page.injectJs('/Users/lqi/work/test/front-end/page_object_casperjs/demo/page/login.js');
var loginPage = new login();
var fs = require( 'fs' );
// var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require( 'phantomcss' );
var server = require('webserver').create();
var x = require("casper").selectXPath;
var resemble= require('resemblejs');
// // var html = fs.read( fs.absolute( fs.workingDirectory + '/demo/coffeemachine.html' ));
//
// server.listen(8080,function(req,res){
// 	res.statusCode = 200;
// 	res.headers = {
// 		'Cache': 'no-cache',
// 		'Content-Type': 'text/html;charset=utf-8'
// 	};
// 	res.write(html);
// 	res.close();
// });

casper.test.begin( 'begin test via ', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/demo/failures' ),
		addLabelToFailedImage: false,
		onPass: function passCallback(){},
		onFail: function failCallback(){},
		onTimeout: function timeoutCallback(){},
		onComplete: function completeCallback(){},
		hideElements: '#thing.selector',
		addLabelToFailedImage: true
	} );

	casper.on( 'remote.message', function ( msg ) {
		this.echo( msg );
	} );

	casper.on( 'error', function ( err ) {
		this.die( "PhantomJS has errored: " + err );
	} );

	casper.on( 'resource.error', function ( err ) {
		casper.log( 'Resource load error: ' + err, 'warning' );
	} );
	/*
		The test scenario
	*/
loginPage.startOnLoginPage();
loginPage.setUsername("qileilove");
phantomcss.screenshot('.main-content','tests');

// phantomcss.screenshot(  '{
//         type: 'xpath',
//         path: '/html/body/article/div/div[1]/div/div[1]'
//       }', 'get the input text' );
loginPage.checkPage();

// 	casper.start( 'https://www.baidu.com' );
//   casper.echo("test start");
// 	casper.viewport( 1024, 768 );
//   casper.then(function() {
//     this.sendKeys(' input#kw.s_ipt', 'casper');
// });
	// casper.then( function () {
	// 	phantomcss.screenshot( 'input#kw', 'get the input text' );
	// } );
  //
	// casper.then( function () {
	// 	casper.click( 'input#su' );
  //
	// 	// wait for modal to fade-in
	// 	casper.waitForSelector( '#help a.feedback',
	// 		function success() {
	// 			phantomcss.screenshot( '#content_left', 'result left' );
	// 		},
	// 		function timeout() {
	// 			casper.test.fail( 'fail' );
	// 		}
	// 	);
	// } );

	// casper.then( function () {
	// 	casper.click( '#cappuccino-button' );
	// 	phantomcss.screenshot( '#myModal', 'cappuccino success' );
	// } );
  //
	// casper.then( function () {
	// 	casper.click( '#close' );
  //
	// 	// wait for modal to fade-out
	// 	casper.waitForSelector( '#myModal[style*="display: none"]',
	// 		function success() {
	// 			phantomcss.screenshot( {
	// 				'Coffee machine close success': {
	// 					selector: '#coffee-machine-wrapper',
	// 					ignore: '.selector'
	// 				},
	// 				'Coffee machine button success': '#coffee-machine-button'
	// 			} );
	// 		},
	// 		function timeout() {
	// 			casper.test.fail( 'Should be able to walk away from the coffee machine' );
	// 		}
	// 	);
	// } );

	casper.then( function now_check_the_screenshots() {
		// compare screenshots
		phantomcss.compareAll();
	} );

	/*
	Casper runs tests
	*/
	casper.run( function () {
		console.log( '\nTHE END.' );
		// phantomcss.getExitStatus() // pass or fail?
		casper.test.done();
	} );
} );
