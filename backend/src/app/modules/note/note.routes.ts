import express from "express";
import { noteController } from "./note.controller";
import validateRequest from "../../middlewares/validateRequest";
import { noteValidataionSchema } from "./note.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router()

router.post("/get", auth(UserRole.STUDENT), validateRequest(noteValidataionSchema.noteGetSchema), noteController.getNote)
router.post("/create", auth(UserRole.STUDENT), validateRequest(noteValidataionSchema.noteCreateSchema), noteController.createNote)

export const noteRoutes = router
