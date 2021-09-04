//npm i -g express
//npm i -g nodemon
//npm i joi
//npm i cheerio
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

app.get('/', (request, response) => {
    response.send('Hellow World');
});

app.get('/apiv2/courses', (request, response) => {
    response.send(courses);
});

app.post('/apiv2/courses', (request, response) => {
    const joischema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = joischema.validate(request.body)
        //console.log(result.error.details);

    if (result.error) {
        response.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: request.body.name
    };
    courses.push(course);
    response.send(course);
});

app.get('/apiv2/getStockName/:id', async(request, response) => {
    const puppeteer = require('puppeteer');
    const cheerio = require('cheerio');
    const titleClass = '.DL5lxuTC';

    const crawlResult = await puppeteer.launch().then(async browser => {
        const page = await browser.newPage();
        const response = await page.goto(`https://finance.yahoo.co.jp/quote/${request.params.id}.T`);
        const htmlResult = await response.text();
        browser.close();
        return htmlResult.toString();
    });

    const $ = cheerio.load(crawlResult);
    //console.log($(priceClass).text());
    response.send($(titleClass).text());
});

app.get('/apiv2/getStockPrice/:id', async(request, response) => {
    const puppeteer = require('puppeteer');
    const cheerio = require('cheerio');
    const priceClass = '.nOmR5zWz';

    const crawlResult = await puppeteer.launch().then(async browser => {
        const page = await browser.newPage();
        const response = await page.goto(`https://finance.yahoo.co.jp/quote/${request.params.id}.T`);
        const htmlResult = await response.text();
        browser.close();
        return htmlResult.toString();
    });

    const $ = cheerio.load(crawlResult);
    const stockName = $(priceClass).text()
    console.log(stockName);
    response.send(stockName);

    /*$.ajax({
       url: URL,
       type: "GET",
       headers: {
         "Access-Control-Allow-Origin": "*",
       },
       success: function (res) {
         var text = res.responseText;
         console.log(text);
       },
     });*/

    /*require("webduino-js");
    require("webduino-blockly");
    var request = require("request");
    request(
      {
        url: "https://finance.yahoo.co.jp/quote/8005.T",
        method: "GET",
      },
      function (error, response, body) {
        if (error || !body) {
          return;
        } else {
          // 爬完網頁後要做的事情
          console.log(body);
        }
      }
    );*/
});

app.get('/apiv2/getStockInfo/:id', async(request, response) => {
    const puppeteer = require('puppeteer');
    const cheerio = require('cheerio');
    const titleClass = '.DL5lxuTC';
    const priceClass = '.nOmR5zWz';

    const crawlResult = await puppeteer.launch().then(async browser => {
        const page = await browser.newPage();
        const response = await page.goto(`https://finance.yahoo.co.jp/quote/${request.params.id}.T`);
        const htmlResult = await response.text();
        browser.close();
        return htmlResult.toString();
    });

    const $ = cheerio.load(crawlResult);
    const result = { 'id': request.params.id, 'name': $(titleClass).text(), 'price': $(priceClass).text() };
    response.json(result);
});

/*app.get('/api/courses/:id', (request, response) => {
    response.send(request.params.id);
})

app.get('/api/posts/:year/:month', (request, response) => {
    response.send(request.params);
    //sortBy=name
    //response.send(request.query);
})*/

//PORT
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on the port ${port}...`));