const puppeteer = require('puppeteer');
const scrapeProducts = require('./logic/productsScraper');
const handleCookies = require('./logic/cookiesHandler');
const fs = require('fs');

const scrape = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  await handleCookies(page);

  const allProducts = [];

  while (true) {
    const pageProducts = await scrapeProducts(page);
    allProducts.push(...pageProducts);

    const nextPageButton = await page.$('#infinity-url');

    if (!nextPageButton) break;

    await nextPageButton.click();
    await page.waitForNavigation();
  }

  await browser.close();

  fs.writeFile('products.json', JSON.stringify(allProducts), () =>
    console.log('file written')
  );
};

module.exports = scrape;
