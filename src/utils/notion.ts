import { Client } from '@notionhq/client'
import { ParentInput } from '@notionhq/client/build/src/api-types'

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export type ParentType = 'database' | 'page'

interface createPageParameters {
    type: ParentType
    id: string
    url: string
    title: string
}

export const createPage = ({
    type,
    id,
    url,
    title
}: createPageParameters) => {

    const parent: ParentInput = {
        [type === 'page' ? 'page_id' : 'database_id']: id
    } as ParentInput

    return notion.pages.create({
        parent,
        properties: {
            URL: {
                type: 'url',
                url
            },
            Name: {
                type: 'title',
                title: [{
                    type: 'text',
                    text: {
                        content: title
                    }
                }]
            }
        },
    })
}

export default notion