var casper = require('casper').create(
    {
     clientScripts: ["jquery.min.js"]
    }
);

var counter_start = casper.cli.args[0] || latest_comic();

function latest_comic() {
  casper.start('http://xkcd.com/', function() {
     return this.getCurrentUrl().split('/').pop();
  });
};

casper.start('http://xkcd.com/' + counter_start, function() {
    this.echo("Start downloading comics, starting with" + counter_start);
});

for(var i = 0; i<counter_start; i++) {
  casper.then(function() {
     this.echo(this.getTitle());
     var url = this.evaluate(function() {
       return jQuery('#comic > img').attr('src');
     });
     this.echo(url);
     this.download(url, url);
     casper.then(function() {
        this.click('[rel="prev"]');
     });
  });
}

casper.then(function() {
   this.echo(this.getTitle());
});
casper.run();
