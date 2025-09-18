import * as express from "express"
import {authentication, random} from "../src/helpers";
import {createUser, getUserByEmail} from "../src/models/user";

const router = express.Router();

router.post("/register", async (req, res) => {
    const {username, password, email} = req.body;
    if (!username || !password) {
        res.status(400).json({
            message: 'Invalid request'
        })
    }
    // const existingUser = await getUserByEmail(email)
    // if (existingUser) {
    //     return res.status(400).json({
    //         message: 'User already exists'
    //     })
    // }
    const salt = random()
    const user = await createUser({
        email, username, password, authentication: authentication(salt, password)
    })
    console.log(email, 'email')
    return res.status(200).json({
        message: "注册成功"
    })
})
router.get('/api', (req, res) => {
    res.status(200).json({
        message: "Hello World"
    })
})


export default router