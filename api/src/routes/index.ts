import { errorHandler } from "../controllers/error.handler"
import { handleGetWeather } from "../controllers/weather.controller"

import { Router } from "express"
import { query } from "express-validator"
const router = Router()

router.get("/weather", query("city").notEmpty().escape(), handleGetWeather)

router.use(errorHandler)

export default router
