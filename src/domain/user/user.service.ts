import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor () {}

    async getUserPage() {
        return { user : {
            age : 12,
            name : "hansu",
            height : 180,
            paper : true
        }};
    }
}