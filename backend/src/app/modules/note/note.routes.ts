import express from "express";
import { noteController } from "./note.controller";
import validateRequest from "../../middlewares/validateRequest";
import { noteValidataionSchema } from "./note.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import accessValidation from "../../middlewares/accessValidation";

const router = express.Router()

router.get("/:videoId", auth(UserRole.STUDENT), accessValidation('video'), noteController.getNote)
router.post("/", auth(UserRole.STUDENT), validateRequest(noteValidataionSchema.noteCreateSchema), accessValidation('video'), noteController.createNote)
router.put("/", auth(UserRole.STUDENT), validateRequest(noteValidataionSchema.noteCreateSchema), accessValidation('video'), noteController.updateNote)
router.delete("/:videoId", auth(UserRole.STUDENT), accessValidation('video'), noteController.deleteNote)
export const noteRoutes = router
