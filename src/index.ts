import { VercelRequest, VercelResponse } from "@vercel/node"
import { createPage } from './utils/notion'
import { notionConfig } from './config/index'
import { getTitle } from "./utils/cheerio"
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    
    try {

        const { body } = req

        if(!body) {
            return res.status(400).send(`url and title miss`)
        }

        if(!body.url) {
            return res.status(400).send(`url required`)
        }

        if(!body.title) {
            return res.status(400).send(`title required`)
        }

        const reps = await createPage({
            type: notionConfig.article.type,
            id: notionConfig.article.id,
            url: body.url,
            title: body.title || getTitle(body.url),
        })

        return res.send(`${reps.object}-${body.title}`)
    } catch (err) {
        console.error(err)
        return res.status(500).send(`add fail`)
    }

}
