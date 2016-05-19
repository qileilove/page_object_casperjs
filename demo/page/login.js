
function login() {
this.startOnLoginPage=function () {
  casper.echo("base url is : " + 'https://github.com/');
     casper.start('https://github.com/');
     casper.then(function functionName() {
      casper.click(x('//div/div/a[2]'));
     });
};

this.setUsername=function (username) {
casper.then(function functionName() {
  casper.echo("set the user name");
  casper.sendKeys(x('//form/div[4]/input[1]'),username);
});
};
this.checkPage=function () {
  casper.then(function () {
       casper.test.assertUrlMatch('login', 'Is on login page');
       casper.test.assertExists('#login_field','login ok');
     });
};
}
