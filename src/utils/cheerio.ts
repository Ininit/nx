import cheerio from 'cheerio'
import fetch from 'node-fetch'

export const getTitle = async (url: string): Promise<string> => {
  try {

    const resp = await fetch(url)

    const text = await resp.text()

    const $ = cheerio.load(text)
  
    return $('title').text()

  } catch (error) {
    
    console.error(error)

    return 'Get Title Failed'

  }
}
