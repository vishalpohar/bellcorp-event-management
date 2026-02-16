import express from "express";
import {
  getEvents,
  getEventById,
} from "../controllers/events.controller.js";

const router = express.Router();

//GET Events Api
router.get("/", getEvents);

//GET Event By Id Api
router.get("/:eventId", getEventById);

export default router;
