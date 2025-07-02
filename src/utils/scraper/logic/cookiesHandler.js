const handleCookies = async (page) => {
  const configureCookiesButton = await page.$(
    '.cookiesplus-btn.cookiesplus-more-information'
  );

  if (configureCookiesButton) {
    configureCookiesButton.click();

    const rejectCookiesButton = await page.$('.cookiesplus-reject-all-label');
    rejectCookiesButton.click();
  }
};

module.exports = handleCookies;
