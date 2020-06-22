const http = require('http');
const fs = require('fs');
const handlebars = require('handlebars');
const inFile = './views/main.hbs';
const outFile = './main.html';
const navbar = require('./views/partials/navbar.hbs');
const jumbo = require('./views/partials/jumbo.hbs');
const body = require('./views/partials/body.hbs');

handlebars.registerPartial('navbar', navbar);
handlebars.registerPartial('jumbo', jumbo);
handlebars.registerPartial('body', body);

const source = fs.readFileSync(inFile, 'utf8');
const template = handlebars.compile(source, { strict: true });
const result = template();

fs.writeFileSync(outFile, result);
console.log(`File written to ${outFile}`);

http.createServer(function (req, res) {
  fs.readFile('main.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(3000);