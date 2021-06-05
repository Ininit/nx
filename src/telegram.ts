import { VercelRequest, VercelResponse } from "@vercel/node"
import Bot from './utils/telegram'
import { isURL } from './utils/index'
import { createPage } from "./utils/notion"
import { notionConfig } from "./config"

module.exports = async (req: VercelRequest, res: VercelResponse) => {
    if (!req.body) {
        res.status(400).send('params format error')
        return
    }
    try {
        const { message: { text, chat: { id }, message_id } } = req.body
        if (!isURL(text)) {
            res.status(400).send('message type must be url')
            return
        }

        //TODO: get article title
        const getUrlTitle = (url: string) => 'article from telegram forward'

        const title = getUrlTitle(text)

        const reps = await createPage({
            type: notionConfig.article.type,
            id: notionConfig.article.id,
            url: text,
            title
        })
        
        Bot.sendMessage(id, `${reps.object}-${title} created success`, { reply_to_message_id: message_id })

        res.send(`success`)

    } catch (error) {
        console.log(error);
        res.status(500).send(`fail`)
    }

    res.send('ok')
}