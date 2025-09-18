import * as express from "express"
import {register} from "../src/controllers/authentication.ts";

const router = express.Router();

router.post("/auth/register", register)

export default router