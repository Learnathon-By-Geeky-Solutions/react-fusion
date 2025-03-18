import express from "express";
import { noteController } from "./note.controller";
import validateRequest from "../../middlewares/validateRequest";
import { noteValidataionSchema } from "./note.validation";

const router = express.Router()

router.post("/get", validateRequest(noteValidataionSchema.noteGetSchema), noteController.getNote)
router.post("/create", validateRequest(noteValidataionSchema.noteCreateSchema), noteController.createNote)

export const noteRoutes = router
