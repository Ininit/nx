import { ParentType } from "../utils/notion";

interface NotionConfig {
    article: {
        type: ParentType
        id: string
    }
}
export const notionConfig: NotionConfig = {
    article: {
        type: 'database',
        id: '705ab6b741b242d0b6b4999827445e1f'
    },
}