export class Comment {
    

    constructor(public post_id: number,
                public user_id: number,
                public content: string,
                public user_name: string
                ) {}
}