// Here we are importing the modules


const fs = require('fs');
const http = require('http');
const url = require('url');

const repT = (temp,product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.i);
    output = output.replace(/{%NAME%}/g,product.n);
    output = output.replace(/{%CONTACT%}/g,product.c);
    output = output.replace(/{%NO%}/g,product.no);
    output = output.replace(/{%MAIL ID%}/g,product.m);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%ID%}/g,product.id);
    return output;
}

// here we are reading the data from the files 
const Overview = fs.readFileSync(`${__dirname}/temp/overview.html`,'utf-8');
const Card = fs.readFileSync(`${__dirname}/temp/card.html`,'utf-8');
const Product = fs.readFileSync(`${__dirname}/temp/product.html`,'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

//here we are creating the server 
const server = http.createServer((req,res) => {
    const {query,pathname} = url.parse(req.url,true);
    if  (pathname === '/' || pathname ==='/overview') {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        const cardsHtml = dataObj.map(el => repT(Card, el)).join('');
        const output = Overview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);
    } else if (pathname ==='/product') {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        const product = dataObj[query.id];
        const output = repT(Product,product);
        res.end(output);
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(data);
    //NOT FOUND
    } else {
        res.writeHead(404,{
            'Content-Type': 'text/html',
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000,'127.0.0.1', () => {
    console.log('Listening at 8000');
});