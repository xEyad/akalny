import { OrderRequest } from "./orderRequest";
const lodash = require('lodash');
export default class Utility
{
    static getUniqueUsers(requests:OrderRequest[])
    {
        const users = requests.map((req)=>req.user);
        const uniqUsers = [];
        for (const user of users) {
            const res = uniqUsers.find((u)=>u.id == user.id)
            if(!res)
                uniqUsers.push(user);
        }
        return uniqUsers;
        const usersJson = users.map((user)=>JSON.stringify(user));
        return Array.from(new Set(usersJson)).map((user)=>JSON.parse(user))
    }
}