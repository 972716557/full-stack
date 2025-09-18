import * as express from 'express';
import {createUser, getUserByEmail} from "../models/user";
import {random, authentication} from "../helpers"

// 注册接口
export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {username, password, email} = req.body;
        if (!username || !password) {
            return res.sendStatus(400).json({
                message: 'Invalid request'
            })
        }
        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            return res.sendStatus(400).json({
                message: 'User already exists'
            })
        }
        const salt = random()
        const user = await createUser({
            email, username, password, authentication: authentication(salt, password)
        })
        return res.status(200)
    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}
