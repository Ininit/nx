import { VercelRequest, VercelResponse } from "@vercel/node"
import { createPage } from './utils/notion'
import { notionConfig } from './config/index'
import { getTitle } from "./utils/puppeteer"
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    
    try {

        const { body } = req

        if(!body) {
            res.status(400).send(`url and title miss`)
            return
        }

        if(!body.url) {
            res.status(400).send(`url required`)
            return
        }

        if(!body.title) {
            res.status(400).send(`title required`)
            return
        }

        const reps = await createPage({
            type: notionConfig.article.type,
            id: notionConfig.article.id,
            url: body.url,
            title: body.title || getTitle(body.url),
        })

        res.send(`${reps.object}-${body.title} created success`)
    } catch (err) {
        console.log(err)
        res.status(500).send(`add fail`)
    }

}
