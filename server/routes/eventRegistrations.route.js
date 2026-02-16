import express from "express";
import {
  cancelEventRegistration,
  createEventRegistration,
  getMyRegistrations,
} from "../controllers/eventRegistrations.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getMyRegistrations);
router.post("/:eventId", protectRoute, createEventRegistration);
router.delete("/:eventId", protectRoute, cancelEventRegistration);

export default router;
