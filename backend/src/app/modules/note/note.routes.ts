import express from "express";
import { noteController } from "./note.controller";
import validateRequest from "../../middlewares/validateRequest";
import { noteValidataionSchema } from "./note.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import accessValidation from "../../middlewares/accessValidation";

const router = express.Router()

router.post("/get", auth(UserRole.STUDENT), validateRequest(noteValidataionSchema.noteGetSchema), accessValidation('video'), noteController.getNote)
router.post("/create", auth(UserRole.STUDENT), validateRequest(noteValidataionSchema.noteCreateSchema), accessValidation('video'), noteController.createNote)
router.post("/update", auth(UserRole.STUDENT), validateRequest(noteValidataionSchema.noteCreateSchema), accessValidation('video'), noteController.updateNote)
router.delete("/delete", auth(UserRole.STUDENT), validateRequest(noteValidataionSchema.noteGetSchema), accessValidation('video'), noteController.deleteNote)
export const noteRoutes = router
