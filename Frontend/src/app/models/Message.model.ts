export class Message {
    

    constructor(public title: string, 
                public content: string,
                public userId?: string,
                public username?: string,
                public id?: number,
                public imageUrl?: string,
                ) {}
}