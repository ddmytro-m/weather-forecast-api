import { errorHandler } from "../controllers/error.handler"
import {
  handleConfirm,
  handleSubscribe,
  handleUnsubscribe,
} from "../controllers/subscription.controller"
import { handleGetWeather } from "../controllers/weather.controller"

import { Router } from "express"
import { body, param, query } from "express-validator"
const router = Router()

router.get("/weather", query("city").notEmpty().escape(), handleGetWeather)

router.post(
  "/subscribe",
  body("email").isEmail(),
  body("city").notEmpty(),
  body("frequency").isIn(["hourly", "daily"]),
  handleSubscribe,
)
router.get("/confirm/:token", param("token").isUUID(), handleConfirm)
router.get("/unsubscribe/:token", param("token").isUUID(), handleUnsubscribe)

router.use(errorHandler)

export default router
