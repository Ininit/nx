import { VercelRequest, VercelResponse } from "@vercel/node"
import Bot from './utils/telegram'
import { isURL } from './utils/index'
import { createPage } from "./utils/notion"
import { notionConfig } from "./config"
import { getTitle } from "./utils/cheerio"

module.exports = async (req: VercelRequest, res: VercelResponse) => {
    if (!req.body) {
        return res.status(400).send('params format error')
    }
    try {
        const { message: { text, chat: { id }, message_id } } = req.body
        if (!isURL(text)) {
            return res.status(400).send('message type must be url')
        }

        const title = await getTitle(text)

        const reps = await createPage({
            type: notionConfig.article.type,
            id: notionConfig.article.id,
            url: text,
            title
        })
        
        await Bot.sendMessage(id, `${reps.object}-${title} created success`, { reply_to_message_id: message_id })

    } catch (error) {
        console.error(error);
        return res.status(500).send(`fail`)
    } 

    return res.send('ok')
    
    }