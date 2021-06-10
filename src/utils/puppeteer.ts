import puppeteer from 'puppeteer-core'

export const getTitle = async (url: string): Promise<string> => {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()
  
  await page.goto(url)

  const title = await page.title()
  
  await browser.close()

  return title

}


