import { Comment } from "./Comment"

export interface PaginationResponseModel {

    "success": true,
    "totalPageCount": number,
    "total": number,
    "count": number,
    "pagination": {
        "previous": {
            "page": number,
            "limit": number
        },
        "next": {
            "page": number,
            "limit": number
        }
    },
    data: Array<Comment>
}