const puppeteer = require('puppeteer')

async function scrapeDictionary(page, userQuery) {
  await page.type('#searchbar_input', `${userQuery}`)
  await page.click('#search-submit')
  await page.waitForNavigation()
  const word = await page.$eval('#top-definitions-section > div.css-1gvu524.e1wg9v5m7 > div.css-jv03sw.e1wg9v5m6 > h1', element => element.textContent)
  const pron = await page.$eval('#top-definitions-section > div.css-1gvu524.e1wg9v5m7 > div.css-ev43ai.ea1n8qa0 > div:nth-child(1) > div > div.pron-spell-container.css-eivff4.evh0tcl2 > span', element => element.textContent)
  const partOfSpeech = await page.$eval('#base-pw > main > section > section > div:nth-child(2) > section:nth-child(2) > div.css-69s207.e1hk9ate3 > span > span', element => element.textContent)
  const definition = await page.$eval('#base-pw > main > section > section > div:nth-child(2) > section:nth-child(2) > div.css-10n3ydx.e1hk9ate0', element => element.textContent)
  return JSON.stringify({website:'Dictionary', word, pron, partOfSpeech, definition})
}

exports.scrape = async (req, res) => {
  const { website, userQuery } = req.query
  const websiteStorage = {
    twitter :'https://twitter.com/explore',
    "Dictionary": 'https://www.dictionary.com'
  }

  if (!Object.keys(websiteStorage).includes(website)) {
    res.status(400)
    res.end()
    return
  }
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(websiteStorage[website])

  if (website === 'Dictionary') res.end(await scrapeDictionary(page, userQuery))
}


