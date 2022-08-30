const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const htmlStr = fs.readFileSync(path.resolve(__dirname, './output/test.html'), {
  encoding: 'utf8',
});

const $ = cheerio.load(htmlStr);

const s = $.parseHTML(htmlStr);

console.info(s);
