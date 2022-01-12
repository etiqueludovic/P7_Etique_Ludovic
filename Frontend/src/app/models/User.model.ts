export class User {
    

    constructor(public password: string,
                public email: string,
                public userId?: number,
                public username?: string,
                public picture?: string,
                public bio?: string[]) {}
}