const scrapeProducts = async (page) => {
  const products = await page.$$('#js-product-list article');

  const productsArray = [];

  for (const product of products) {
    const name = await product.$eval('.product-title a', (e) => e.innerText);
    const price = await product.$eval('.product-price', (e) =>
      e.innerText.replace(/\u00A0/g, ' ')
    );
    const img = await product.$eval('img', (e) => e.getAttribute('data-src'));
    // data-src en vez de src, ya que los srcs no se cargan correctamente de inmediato debido a un lazyload

    productsArray.push({ name, price, img });
  }

  return productsArray;
};

module.exports = scrapeProducts;
